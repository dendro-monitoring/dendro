import React from 'react';
import Row from './Row';
import { CloudWatchLog } from '../../constants/frontendTypes';

export default function Table({ logs }: { logs: CloudWatchLog[] }) {
  return (
    <>
      <div className="w-full md:w-3/5 mx-auto p-8">
        <div className="shadow-md">
          { logs.logStreams.map( (logStream, index) => (
            <div className="tab w-full overflow-hidden border-t" key={logStream.creationTime}>
              <input className="absolute opacity-0" id={`tab-multi-${index}`} type="checkbox" name="tabs"/>
              <label className="block p-5 leading-normal cursor-pointer" htmlFor={`tab-multi-${index}`}>{logStream.logStreamName}</label>
              <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                <p className="p-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
