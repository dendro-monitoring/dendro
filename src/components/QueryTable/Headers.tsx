import { QueryHeader } from './Table';

function Header({ text }: { text: string }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {text}
    </th>
  );
}

export default function Headers({ headers }: { headers: QueryHeader[] }) {
  return (
    <tr>
      {headers.length > 0
        ? headers.map(({ Name }) => <Header text={Name} key={Name} />)
        : <Header text={"No Data"} />}
    </tr>
  );
}
