import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "/src/data/form.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const body = JSON.parse(req?.body);

  jsonData?.steps[Number(body?.stepIndex)]?.fields?.splice(
    Number(body?.fieldIndex),
    1
  );
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  res
    .status(200)
    .json({ message: "Data updated successfully", data: jsonData });
}
