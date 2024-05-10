import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "/src/data/form.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  jsonData.steps.push(JSON.parse(req.body));

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  res.status(200).json({ message: "Data updated successfully" });
}
