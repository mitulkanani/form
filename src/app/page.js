"use client"
import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import jsonData from '../data/form.json';
import FormField from '../../src/components/FormField/FormField';
import DataTable from 'react-data-table-component';

const App = () => {
  const [formData, setFormData] = useState({});
  const [savedFormDataValues, setSavedFormDataValues] = useState([]);

  // Function to fetch existing data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setSavedFormDataValues(JSON.parse(storedData));
    }
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSave = () => {
    // Prepare updated form data
    const updatedFormData = {};
    jsonData.fields.forEach(field => {
      if (field.type === 'checkbox') {
        updatedFormData[field.name] = formData[field.label] ? 'on' : 'off';
      } else {
        updatedFormData[field.name] = formData[field.label];
      }
    });

    // Update saved form data values
    setSavedFormDataValues(prevData => [...prevData, updatedFormData]);

    // Save data to local storage for persistence
    localStorage.setItem('formData', JSON.stringify([...savedFormDataValues, updatedFormData]));

    // Optionally, you can reset the form after saving
    setFormData({});

    // Download data as JSON file
    const jsonDataString = JSON.stringify([...savedFormDataValues, updatedFormData], null, 2); // Format JSON for readability
    const blob = new Blob([jsonDataString], { type: 'application/json' });
    const encodedUri = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'form_data.json');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Cleanup
  };

  const columns = jsonData.fields.map(field => ({
    name: field.label,
    selector: row => row[field.name], // Use field name as key to access row property
    sortable: true,
  }));

  return (
    <Container>
      <form className='form-container'>
        {jsonData.fields.map((field, index) => (
          <FormField
            key={index}
            field={field}
            value={formData[field.label] || ''}
            onFieldChange={value => handleFieldChange(field.label, value)}
          />
        ))}
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </form>
      <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
        Saved Form Data Values:
      </Typography>
      {savedFormDataValues && savedFormDataValues.length > 0 ? (
        <DataTable columns={columns} data={savedFormDataValues} pagination />
      ) : (
        <Typography variant="body1">No saved data available.</Typography>
      )}
    </Container>
  );
};

export default App;
