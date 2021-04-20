import { useState } from "react";
import Row from "./Row";
import Footer from "./Footer";
import Headers from "./Headers";
import { QueryData, QueryHeader } from '../../constants/frontendTypes';

interface Props {
  headers: QueryHeader[]
  rows: QueryData[]
}

export default function Table({ headers, rows }: Props) {
  const [page, setPage] = useState(1);

  const start = rows.length > 0 ? 10 * (page - 1) + 1 : 0;
  const end = rows.length >= 10 ? page * 10 : rows.length;

  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <Headers headers={headers} />
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {rows.slice(start - 1, end).map(({ Data }, idx) => <Row row={Data} key={idx} />)}
              </tbody>
            </table>

            <Footer
              rows={rows}
              page={page}
              setPage={setPage}
              start={start}
              end={end}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
