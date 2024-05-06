"use client"
import React, { ChangeEvent, useState } from 'react';
import { Button, Step, StepLabel, Stepper, Typography, FormControlLabel, Checkbox, RadioGroup, Radio, Select, MenuItem, FormControl, InputLabel, FormLabel, TextField } from '@mui/material';

interface Field {
    type: 'text' | 'checkbox' | 'radio' | 'select'; // Restricting field types to known types
    label: string;
    placeholder?: string;
    value?: string | boolean; // Allowing string or boolean values for field value
    name: string;
    options?: { value: string, label: string }[];
}

interface Step {
    label: string;
    fields: Field[];
}

interface Form {
    steps: Step[];
}

const StepperForm = ({ steps }: Form) => {
    const [activeStep, setActiveStep] = useState(0);
    // Setting initial state type to FormDataType
    const [formData, setFormData] = useState<{ [key: string]: string | boolean }>({});

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        // Use appropriate type for formData based on field type
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? e.target.checked : value
        }));
    };

    const handleSubmit = () => {
        console.log('Form data:', formData);
    };

    const renderStepFields = () => {
        const stepFields = steps[activeStep].fields;
        return stepFields.map((field, index) => {
            switch (field.type) {
                case 'text':
                    return (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 text-lg font-bold mb-2">
                                {field.label}
                            </label>
                            <TextField label={field.label} placeholder={field.placeholder} onChange={handleInputChange} className="shadow appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    );
                case 'checkbox':
                    return (
                        <div key={index} className="mb-4 text-black">
                            <FormControlLabel
                                control={<Checkbox color="primary" name={field.name} checked={formData[field.name] as any || false} onChange={handleInputChange} />}
                                label={field.label}
                            />
                        </div>
                    );
                case 'radio':
                    return (
                        <div key={index} className="mb-4 text-black">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{field.label}</FormLabel>
                                <RadioGroup
                                    aria-label={field.label}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                >
                                    {field.options?.map((option, optionIndex) => (
                                        <FormControlLabel key={optionIndex} value={option.value} control={<Radio />} label={option.label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    );
                case 'select':
                    return (
                        <div key={index} className="mb-4">
                            <FormControl fullWidth>
                                <InputLabel id={`demo-simple-select-label-${field.label}`}>{field.label}</InputLabel>
                                <Select
                                    labelId={field.label}
                                    id={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange as any}
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
        <div className="">
            {/* Navbar */}
            <div className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <span className="text-lg font-bold">Multi-Step Form</span>
                    {/* Add navbar items or buttons here */}
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-[280px] h-[calc(100vh-80px)] p-4 bg-gray-200">
                    <h2 className="text-lg font-bold mb-4">Sidebar</h2>
                    {/* Add sidebar content or navigation links here */}
                </div>

                {/* Form */}
                <div className="w-[calc(100vw-280px)] h-[calc(100vh-104px)] p-4  mt-10 container mx-auto">
                    <Stepper activeStep={activeStep} alternativeLabel className='w-full'>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div className='flex items-center mt-10 xl:pl-[100px] 2xl:pl-[135px] 3xl:pl-[180px]'>
                        <div className='w-[700px]'>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography variant="h3" gutterBottom>All steps completed</Typography>
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                                </div>
                            ) : (
                                <div>
                                    {/* <Typography variant="h4" gutterBottom>{steps[activeStep].label}</Typography> */}
                                    {renderStepFields()}

                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-end items-end xl:pr-[100px] 2xl:pr-[135px] 3xl:pr-[180px] pt-[200px] '>
                        <Button disabled={activeStep === 0} onClick={handleBack} className="mr-4">
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepperForm;
