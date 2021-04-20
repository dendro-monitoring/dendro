import type { NextApiRequest, NextApiResponse } from 'next';
import listTables from "../../aws/orchestrator/listTables";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const tables = await listTables();
    res.status(200).json({ tables });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
