"use client";
import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import Image from "next/image";

interface Field {
  type: "text" | "checkbox" | "radio" | "select"; // Restricting field types to known types
  label: string;
  placeholder?: string;
  value?: string | boolean; // Allowing string or boolean values for field value
  name: string;
  options?: { value: string; label: string }[];
}

interface Step {
  label: string;
  fields: Field[];
}

interface Form {
  steps: Step[];
}

const SidebarData = [
  {
    id: 1,
    image: "/svg/cube.svg",
    title: "categories",
  },
  {
    id: 2,
    image: "/svg/setting.svg",
    title: "setting",
  },
];

const ImageData = [
  {
    id: 1,
    image: "/svg/linkedin.svg",
  },
  {
    id: 2,
    image: "/svg/instagram.svg",
  },
  {
    id: 3,
    image: "/svg/twitter.svg",
  },
  {
    id: 4,
    image: "/svg/youtube.svg",
  },
];

const StepperForm = ({ steps }: Form) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formDataArray, setFormDataArray] = React.useState<any[]>([]); // State to hold form data array

  const formik: any = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      termsandconditions: false,
      gender: "",
      age: "",
      country: "",
    },
    onSubmit: (values) => {
      setFormDataArray((prevData) => [...prevData, values]);
      console.log(values);
    },
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepFields = () => {
    const stepFields = steps[activeStep].fields;
    return stepFields.map((field, index) => {
      switch (field.type) {
        case "text":
          return (
            <div key={index} className='mb-4'>
              <label className='block text-gray-700 text-lg font-bold mb-2'>
                {field.label}
              </label>
              <TextField
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                onChange={formik.handleChange}
                value={formik.values[field.name]}
                className='shadow appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          );
        case "checkbox":
          return (
            <div key={index} className='mb-4 text-black'>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name={field.name}
                    checked={formik.values[field.name] as boolean}
                    onChange={formik.handleChange}
                  />
                }
                label={field.label}
              />
            </div>
          );
        case "radio":
          return (
            <div key={index} className='mb-4 text-black'>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>{field.label}</FormLabel>
                <RadioGroup
                  aria-label={field.label}
                  name={field.name}
                  value={formik.values[field.name] as string}
                  onChange={formik.handleChange}
                >
                  {field.options?.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          );
        case "select":
          return (
            <div key={index} className='mb-4 text-black'>
              <FormControl fullWidth>
                <InputLabel id={`demo-simple-select-label-${field.label}`}>
                  {field.label}
                </InputLabel>
                <Select
                  labelId={`demo-simple-select-label-${field.label}`}
                  id={field.name}
                  name={field.name}
                  onChange={formik.handleChange}
                  value={formik.values[field.name] as string}
                >
                  {field.options?.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className='w-full'>
      {/* Navbar */}
      {/* <div className='bg-gray-800 text-white p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <span className='text-lg font-bold'>Multi-Step Form</span>
        
        </div>
      </div> */}

      <div className='flex max-h-[calc(100vh-116px)]'>
        {/* Form */}
        <div className='w-full h-[calc(100vh-104px)] p-4  mt-10  mx-auto'>
          <Stepper activeStep={activeStep} alternativeLabel className='w-full'>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className='flex items-center mt-10 xl:pl-[60px] 2xl:pl-[95px] 3xl:pl-[140px]'>
            <div className='3xl:w-[600px] w-[450px]'>
              <div>{activeStep === steps.length ? "" : renderStepFields()}</div>
            </div>
          </div>
          <div className='flex justify-end items-end xl:pr-[60px] 2xl:pr-[95px] 3xl:pr-[140px] 2xl:pt-[100px] 3xl:pt-[200px] '>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className='mr-4'
            >
              Back
            </Button>
            <Button variant='contained' color='primary' onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
        <div className='w-[500px] flex flex-col gap-2 h-[calc(100vh-116px)] p-2 bg-gray-200 shadow-xl'>
          <div className=' w-full 2xl:min-h-[300px] 3xl:min-h-[400px] border-b border-b-[#1f2937]'>
            1
          </div>
          <div className=' w-full 2xl:min-h-[calc(100vh-432px)] 3xl:min-h-[calc(100vh-532px)]'>
            1
          </div>
          <div></div>
          {/* Add sidebar content or navigation links here */}
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
