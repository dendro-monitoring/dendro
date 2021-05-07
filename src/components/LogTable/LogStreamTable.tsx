import React, { useState } from 'react';
import Row from './Row';
import Footer from '../QueryTable/Footer';

export default function LogStreamTable(props: any) {
  const { logStream } = props;
  const [page, setPage] = useState(1);

  const start = logStream.events.length > 0 ? 10 * (page - 1) + 1 : 0;
  const end = logStream.events.length >= 10 ? page * 10: logStream.events.length;

  return (
    <div className= "flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                                Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                                Message
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {logStream.events.slice(start - 1, end).map((log: any) => <Row log={log} key={log.TIME} />)}
              </tbody>

            </table>
            <Footer
              rows={logStream.events}
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
