import React from 'react';
import { TextField, Checkbox, RadioGroup, FormControlLabel, Radio, MenuItem, FormControl, Select, FormLabel, InputLabel } from '@mui/material';

const FormField = ({ field, value, onFieldChange }) => {
    const { type, label, options, placeholder } = field;

    const handleChange = (event) => {
        const newValue = type === 'checkbox' ? event.target.checked : event.target.value;
        onFieldChange(newValue);
    };

    switch (type) {
        case 'text':
            return <TextField label={label} placeholder={placeholder} value={value} onChange={handleChange} />;
        case 'checkbox':
            return <FormControlLabel control={<Checkbox checked={value} onChange={handleChange} />} label={label} />;
        case 'radio':
            return (
                <FormControl component="fieldset">
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup value={value} onChange={handleChange}>
                        {options.map((option, index) => (
                            <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        case 'select':
            return (
                <FormControl>
                    <InputLabel id={`demo-simple-select-label-${label}`}>{label}</InputLabel>
                    <Select value={value} onChange={handleChange} labelId={`demo-simple-select-label-${label}`} label={label}>
                        {options.map((option, index) => (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        default:
            return null;
    }
};

export default FormField;
