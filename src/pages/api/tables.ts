import type { NextApiRequest, NextApiResponse } from 'next';
import listTables from '../../aws/orchestrator/timestream/listTables';
import listDatabases from '../../aws/timestream/listDatabases';
import { MonitoredService, VectorService } from '../../constants/frontendTypes';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    if ((await listDatabases()).length === 0) return res.status(200).json({ data: [] });

    const tables = await listTables();

    const data: MonitoredService[] = [];
    tables.forEach((table: { TableName: VectorService }) => {
      data.push({ name: table.TableName });
    });

    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: [] });
  }
};
