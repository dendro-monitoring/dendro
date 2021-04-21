import { CloudWatchLog } from '../../constants/frontendTypes';

export default function Row({ log }: { log: CloudWatchLog }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {(new Date(log.ingestionTime)).toDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">Write</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">
          {log.message.includes('Write records successful')
            ? 'Success'
            : 'Error'
          }
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
              Write records to the time-series database
      </td>
    </tr>
  );
}
