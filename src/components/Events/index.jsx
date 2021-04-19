// import moment from "moment";

export default function Events({ events }) {

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {events.map((event) => {
        return (
          <tr key={event.TIME}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {(new Date(event.ingestionTime)).toDateString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">Write</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-500">
                {event.message.includes('Write records successful')
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
      })}
    </tbody>
  );
}
