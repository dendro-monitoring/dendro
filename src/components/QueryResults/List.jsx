import React, { useState } from "react";
import QueryResults from ".";
import Footer from "./Footer";

const Header = ({ text }) => (
  <th
    scope="col"
    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {text}
  </th>
);

export default function List({ headers, rows }) {
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
                <tr>
                  {headers.length > 0
                    ? headers.map(({ Name }) => <Header text={Name} key={Name} />)
                    : <Header text={"No Data"} />}
                </tr>
              </thead>
              <QueryResults rows={rows.slice(start - 1, end)} />
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
