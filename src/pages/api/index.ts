import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const fetchData = (_req: NextApiRequest, res: NextApiResponse) => {
  const filePath = path.join(process.cwd(), "/src/data/form.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export default fetchData;
