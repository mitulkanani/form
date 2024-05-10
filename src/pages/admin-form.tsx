import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import Layout from "../layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type InitialValues = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  options?:
    | {
        value: string;
        label: string;
      }[]
    | [];
};
const AdminForm = () => {
  const [data, setData] = useState<any>([]);
  const [fieldVal, setFieldVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenField, setIsOpenField] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch("/api");
      const jsonData = await response.json();
      setData(jsonData);
      if (response.ok) {
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const addFilds = async (data: any, index: number) => {
    try {
      const response = await fetch("/api/addfield", {
        method: "POST",
        body: JSON.stringify({
          data: data,
          index: index,
        }),
      });
      if (response.ok) {
        fetchData();
        setIsOpenField(false);
        resetForm();
        setIsOpen(false);
      } else {
        console.error("Failed to added data");
      }
    } catch (error) {
      console.error("Error added data:", error);
    }
  };

  const deleteField = async (stepIndex: number, fieldIndex: number) => {
    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        body: JSON.stringify({
          stepIndex,
          fieldIndex,
        }),
      });
      const data = await response.json();

      if (data) {
        fetchData();
      }
    } catch (error) {
      console.error("Error delete data:", error);
    }
  };

  const deleteStepHandler = async (stepIndex: number) => {
    try {
      const response = await fetch("/api/delete-step", {
        method: "POST",
        body: JSON.stringify({
          stepIndex,
        }),
      });

      const data = await response.json();

      if (data) {
        fetchData();
      }
    } catch (error) {
      console.error("Error delete data:", error);
    }
  };

  const initialValues: InitialValues = {
    label: "",
    type: "text",
    name: "",
    placeholder: "",
    value: "",
    options: [{ value: "", label: "" }],
  };
  const {
    handleSubmit,
    handleChange,
    resetForm,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: (value) => {
      const data = value;
      if (values.type === "text" && data.options) {
        delete data.options;
      }

      addFilds(data, currentIndex);
    },
  });

  const updateData = async (label: string) => {
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        body: JSON.stringify({
          label: label,
          fields: [],
        }),
      });
      if (response.ok) {
        fetchData();
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fieldHandler = (field: any, stepIndex: number, fieldIndex: number) => {
    switch (field?.type) {
      case "text":
        return (
          <div className='mb-4 w-full'>
            <div className='w-full flex items-center justify-between gap-2'>
              <TextField
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                className='shadow appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              <IconButton
                color='error'
                aria-label='add to shopping cart'
                onClick={() => {
                  deleteField(stepIndex, fieldIndex);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </div>
          </div>
        );
      case "checkbox":
        return (
          <div className='mb-4 text-black'>
            <FormControlLabel
              control={<Checkbox color='primary' name={field.name} />}
              label={field.label}
            />
            <IconButton
              color='error'
              aria-label='add to shopping cart'
              onClick={() => {
                deleteField(stepIndex, fieldIndex);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </div>
        );

      case "radio":
        return (
          <div className='mb-4 text-black'>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>{field.label}</FormLabel>
              <RadioGroup aria-label={field.label} name={field.name}>
                {field.options?.map((option: any, optionIndex: number) => (
                  <>
                    <div
                      className='w-full flex items-center justify-between gap-2'
                      key={optionIndex}
                    >
                      <FormControlLabel
                        key={optionIndex}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                      <IconButton
                        color='error'
                        aria-label='add to shopping cart'
                        onClick={() => {
                          deleteField(stepIndex, fieldIndex);
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  </>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        );

      case "select":
        return (
          <div className='mb-4 text-black'>
            <FormControl fullWidth>
              <InputLabel id={`demo-simple-select-label-${field.label}`}>
                {field.label}
              </InputLabel>
              <div className='w-full flex items-center gap-2'>
                <Select
                  labelId={`demo-simple-select-label-${field.label}`}
                  id={field.name}
                  name={field.name}
                  className='w-full'
                >
                  {field.options?.map((option: any, optionIndex: number) => (
                    <MenuItem key={optionIndex} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <IconButton color='error' aria-label='add to shopping cart'>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </FormControl>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className='mx-auto max-w-3xl flex flex-col items-center py-20 w-full'>
        <div className='w-full flex justify-end'>
          <IconButton
            color='primary'
            aria-label='add to shopping cart'
            onClick={() => setIsOpenField(!isOpen)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        {data &&
          data?.steps &&
          data?.steps.length &&
          data?.steps.map((item: any, index: number) => (
            <>
              <Accordion className='w-full'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1-content'
                  id='panel1-header'
                  className='w-full'
                >
                  <div className='flex items-center justify-between w-full'>
                    <h3 className='text-base font-bold'>{item.label}</h3>

                    <IconButton
                      color='error'
                      aria-label='Delete Step'
                      onClick={(e) => {
                        e?.stopPropagation();
                        deleteStepHandler(index);
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </AccordionSummary>

                <AccordionDetails className='w-full'>
                  <div className='w-full flex justify-end'>
                    <IconButton
                      color='primary'
                      aria-label='add to shopping cart'
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setCurrentIndex(index);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>

                  {item?.fields?.map((f: any, fieldIndex: number) => (
                    <>
                      <div>{fieldHandler(f, index, fieldIndex)}</div>
                    </>
                  ))}
                </AccordionDetails>
              </Accordion>
            </>
          ))}
      </div>

      <div>
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(!isOpen);
            resetForm();
          }}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <form
            onSubmit={handleSubmit}
            className='bg-white max-w-[560px] w-full flex flex-col gap-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute p-5 rounded-md'
          >
            <div className='w-full flex justify-between items-center border-b'>
              <h3 className='text-base font-bold'>Add New Field</h3>
              <IconButton
                color='primary'
                aria-label='add to shopping cart'
                onClick={() => {
                  setIsOpen(!isOpen);
                  resetForm();
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <div className='flex flex-col gap-4 w-full'>
              <TextField
                id='label'
                name='label'
                label='Label'
                value={values?.label}
                variant='outlined'
                onChange={handleChange}
              />

              <FormControl>
                <InputLabel id='demo-simple-select-helper-label'>
                  Type
                </InputLabel>
                <Select
                  labelId='demo-simple-select-helper-label'
                  id='type'
                  name='type'
                  value={values?.type}
                  label='Type'
                  onChange={handleChange}
                >
                  <MenuItem value={"text"} selected>
                    Text
                  </MenuItem>
                  <MenuItem value={"checkbox"}>Checkbox</MenuItem>
                  <MenuItem value={"radio"}>Radio</MenuItem>
                  <MenuItem value={"selectbox"}>Selectbox</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id='name'
                value={values?.name}
                name='name'
                label='Name'
                variant='outlined'
                onChange={handleChange}
              />

              {values?.type === "text" ? (
                <>
                  <TextField
                    id='placeholder'
                    name='placeholder'
                    value={values?.placeholder}
                    label='Placeholder'
                    variant='outlined'
                    onChange={handleChange}
                  />

                  <TextField
                    id='value'
                    value={values?.value}
                    name='value'
                    label='Value'
                    variant='outlined'
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <div className='w-full flex justify-between items-center border-b'>
                    <h3 className='text-base font-bold'>Options</h3>
                    <IconButton
                      color='primary'
                      aria-label='add to shopping cart'
                      onClick={() => {
                        setFieldValue("options", [
                          ...(values?.options || []),
                          { label: "" },
                        ]);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>

                  {values?.options?.map((opt, index) => (
                    <div key={index} className='flex gap-3'>
                      <TextField
                        id={`options[${index}].label`}
                        name={`options[${index}].label`}
                        value={opt.label}
                        label='Option Label'
                        variant='outlined'
                        className='w-full'
                        onChange={handleChange}
                      />
                      <TextField
                        id={`options[${index}].value`}
                        name={`options[${index}].value`}
                        value={opt?.value}
                        label='Option Value'
                        className='w-full'
                        variant='outlined'
                        onChange={handleChange}
                      />
                      <IconButton
                        color='error'
                        aria-label='add to shopping cart'
                        onClick={() => {
                          if (values?.options) values?.options.splice(index, 1);
                          setFieldValue("options", values?.options);
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  ))}
                </>
              )}

              <Button
                type='submit'
                variant='contained'
                className='w-fit mx-auto'
              >
                Save
              </Button>
            </div>
          </form>
        </Modal>

        <Modal
          open={isOpenField}
          onClose={() => setIsOpenField(!isOpenField)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div className='bg-white max-w-[560px] w-full flex flex-col gap-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute p-5 rounded-md'>
            <div className='w-full flex justify-between items-center border-b'>
              <h3 className='text-base font-bold'>Add New Field</h3>
              <IconButton
                color='primary'
                aria-label='add to shopping cart'
                onClick={() => setIsOpenField(!isOpenField)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className='flex flex-col gap-4 w-full'>
              <TextField
                id='outlined-basic'
                label='Step Label'
                variant='outlined'
                value={fieldVal}
                onChange={(e) => setFieldVal(e.target.value)}
              />
              <Button
                variant='contained'
                className='w-fit mx-auto'
                onClick={() => {
                  setIsOpenField(false);
                  updateData(fieldVal);
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default AdminForm;
