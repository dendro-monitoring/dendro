import { CloudWatchLog } from '../../constants/frontendTypes';

export default function Row({ log }: { log: CloudWatchLog }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {(new Date(log.ingestionTime)).toDateString()}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {log.message}
      </td>
    </tr>
  );
}
