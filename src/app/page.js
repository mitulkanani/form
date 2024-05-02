"use client"
import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import jsonData from '../data/form.json';
import FormField from '../../src/components/FormField/FormField';
import DataTable from 'react-data-table-component';

const App = () => {
  const [formData, setFormData] = useState({});
  const [savedFormDataValues, setSavedFormDataValues] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem("savedFormDataValues");
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (error) {
          console.error('Error parsing savedFormDataValues:', error);
        }
      }
    }
    return [];
  });


  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSave = () => {
    // Update the formData state with the latest values
    const updatedFormData = {};
    jsonData.fields.forEach(field => {
      if (field.type === 'checkbox') {
        // If the field is a checkbox, send 'on' if checked, 'off' if unchecked
        updatedFormData[field.name] = formData[field.label] ? 'on' : 'off';
      } else {
        updatedFormData[field.name] = formData[field.label];
      }
    });

    // Send a POST request to the API route with the updated form data
    fetch('/api/addFormData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data saved successfully:', data);
        localStorage.setItem('savedFormDataValues', JSON.stringify(data.data))
        setSavedFormDataValues(data.data || []);
        // Optionally, perform any other actions upon successful save
      })
      .catch(error => {
        console.error('Error saving data:', error);
        // Handle error
      });
  };


  const columns = jsonData.fields.map(field => ({
    name: field.label,
    selector: row => row[field.name], // Use field name as key to access row property
    sortable: true,
  }));
  console.log(columns)
  console.log(savedFormDataValues, "savedFormDataValues")
  return (
    <Container>
      <form className='form-container'>
        {jsonData.fields.map((field, index) => (
          <FormField
            key={index}
            field={field}
            value={formData[field.label] || ''}
            onFieldChange={(value) => handleFieldChange(field.label, value)}
          />
        ))}
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </form>
      <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
        Saved Form Data Values:
      </Typography>
      {savedFormDataValues && savedFormDataValues.length > 0 ? (
        <DataTable
          columns={columns}
          data={savedFormDataValues}
          pagination // Enable pagination if needed
        />
      ) : (
        <Typography variant="body1">No saved data available.</Typography>
      )}
    </Container>
  );
};

export default App;
