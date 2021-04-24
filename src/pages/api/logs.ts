import type { NextApiRequest, NextApiResponse } from 'next';
import getLogs from '../../aws/orchestrator/cloudwatch/getLogs';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const logs = await getLogs();
    res.status(200).json({ logs });
  } catch (e) {
    res.status(500);
  }
};
