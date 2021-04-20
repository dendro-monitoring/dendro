import type { NextApiRequest, NextApiResponse } from 'next';
import getLogEvents from "../../aws/orchestrator/getLogEvents";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const logs = await getLogEvents();
    res.status(200).json({ logs });
  } catch (e) {
    res.status(500);
  }
};
