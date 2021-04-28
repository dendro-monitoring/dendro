import React from 'react';
import Row from './Row';
import { CloudWatchLog } from '../../constants/frontendTypes';

export default function Table({ logs }: { logs: CloudWatchLog[] }) {
  return (
    <>
      <div className="w-full md:w-5/5 mx-auto p-8">
        <div className="shadow-md">
          { logs.logStreams.map( (logStream, index) => (
            <div className="tab w-full overflow-hidden border-t" key={logStream.creationTime}>
              <input className="absolute opacity-0" id={`tab-multi-${index}`} type="checkbox" name="tabs"/>
              <label className="block p-5 leading-normal cursor-pointer" htmlFor={`tab-multi-${index}`}>{logStream.logStreamName}</label>
              <div className="tab-content border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                <div className="flex flex-col">
                  <div className="-my-2 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                            {logStream.events.map((log) => <Row log={log} key={log.TIME} />)}
                          </tbody>

                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
