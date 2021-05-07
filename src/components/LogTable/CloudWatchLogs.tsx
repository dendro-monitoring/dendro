import React from 'react';
import { CloudWatchLog } from '../../constants/frontendTypes';
import LogStreamTable from './LogStreamTable';

export default function CloudWatchLogs({ logs }: { logs: CloudWatchLog[] }) {
  return (
    <>
      <div className="w-full md:w-5/5 mx-auto p-8">
        <div className="shadow-md">
          { logs.logStreams.map( (logStream, index) => {
            return(
              <div className="tab w-full overflow-hidden border-t" key={logStream.creationTime}>
                <input className="absolute opacity-0" id={`tab-multi-${index}`} type="checkbox" name="tabs"/>
                <label className="block p-5 leading-normal cursor-pointer" htmlFor={`tab-multi-${index}`}>{logStream.logStreamName}</label>
                <div className="tab-content border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <LogStreamTable logStream={logStream} />
                </div>
              </div>
            );})}

        </div>
      </div>
    </>
  );}
