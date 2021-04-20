import type { NextApiRequest, NextApiResponse } from 'next';
import query from "../../aws/orchestrator/query";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const q = JSON.parse(req.body).query;
    const results = await query(q);
    res.status(200).json({ data: results });
  } catch (e) {
    res.status(500);
  }
};
