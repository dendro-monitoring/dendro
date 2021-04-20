import { QueryRow } from './Table';

export default function Row({ row }: { row: QueryRow[] }) {
  return (
    <tr>
      {row.map(({ ScalarValue }, idx: number) => (
        <td className="px-6 py-4 whitespace-nowrap" key={idx}>
          <div className="text-sm font-medium text-gray-900">
            {ScalarValue}
          </div>
        </td>
      ))}
    </tr>
  );
}
