import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), '/src/data/form.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const body = JSON.parse(req.body);
      jsonData?.steps[Number(body?.stepIndex)]?.fields?.splice(
        Number(body?.fieldIndex),
        1
      );
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      res
        .status(200)
        .json({ message: 'Data deleted successfully', data: jsonData });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        errorMessage: error,
        res: JSON.stringify(error),
      });
    }
  });
}
