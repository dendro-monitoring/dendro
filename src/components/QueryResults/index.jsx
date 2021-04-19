// import moment from "moment";

export default function QueryResults({ rows }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map(({ Data }, idx) => {
        return (
          <tr key={idx}>
            {Data.map(({ ScalarValue }, idx2) => (
              <td className="px-6 py-4 whitespace-nowrap" key={idx2}>
                <div className="text-sm font-medium text-gray-900">
                  {ScalarValue}
                </div>
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
