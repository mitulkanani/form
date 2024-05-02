// pages/api/addFormData.js

import fs from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

export async function POST(request) {
  try {
    const {
      firstname,
      lastname,
      age,
      termsandconditions,
      gender,
      country
    } = await request.json();

    // Create an object with the received data
    const formData = {
      firstname,
      lastname,
      age,
      termsandconditions,
      gender,
      country
    };
    console.log(formData, "formData")

    // Path to the JSON file
    const filePath = path.resolve('D:/Tn-Projects/form/src/data/formData.json');

    // Read existing data from the file
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Check if existingData is an array, otherwise initialize it as an empty array
    const allData = Array.isArray(existingData) ? [formData, ...existingData] : [formData];

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));

    // Respond with success message
    return NextResponse.json(
      {
        status: "success",
        data: allData,
        message: "Contact created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error while creating contact : ${error}` },
      { status: 500 }
    );
  }
}
