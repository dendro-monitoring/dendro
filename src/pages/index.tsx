import { useEffect, useState } from 'react';
import TrafficList from '../components/traffic';
import ServicesList from '../components/Services/List';
import LogTable from '../components/LogTable/Table';

import { MonitoredService } from '../constants/frontendTypes';

interface Props {
  services: MonitoredService[]
}

export default function Home({ services }: Props) {
  const [logs, setLogs] = useState({ logStreams: [{
    logStreamName: '2021/04/27/[$LATEST]fabf572782014d7093c92acdf639435a',
    creationTime: 1619559437780,
    firstEventTimestamp: 1619559430810,
    lastEventTimestamp: 1619559584705,
    lastIngestionTime: 1619559593345,
    uploadSequenceToken: '49609674868583835627285480401395376777896376309679495170',
    arn: 'arn:aws:logs:us-east-1:141351053848:log-group:/aws/lambda/_deployableLambdaFunction:log-stream:2021/04/27/[$LATEST]fabf572782014d7093c92acdf639435a',
    storedBytes: 0,
    events: [ {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 86\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 87\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 88\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 89\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 90\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 86\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 87\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 88\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 89\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 90\n',
      'ingestionTime': 1619559477143
    },
    ]
  },
  {
    logStreamName: '2021/04/27/[$LATEST]99f4cac93c4d40d795bf52a6fc91105a',
    creationTime: 1619559421476,
    firstEventTimestamp: 1619559416180,
    lastEventTimestamp: 1619559496304,
    lastIngestionTime: 1619559503849,
    uploadSequenceToken: '49612743790005277477902513225953506941073727052862736322',
    arn: 'arn:aws:logs:us-east-1:141351053848:log-group:/aws/lambda/_deployableLambdaFunction:log-stream:2021/04/27/[$LATEST]99f4cac93c4d40d795bf52a6fc91105a',
    storedBytes: 0,
    events: [ {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 86\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 87\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 88\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 89\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '},\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': '{\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'Reason: "A record already exists with the same time, dimensions, measure name, and record version. A higher record version must be specified in order to update the measure value. Specifying record version is supported by the latest SDKs.",\n',
      'ingestionTime': 1619559477143
    },
    {
      'timestamp': 1619559476944,
      'message': 'RecordIndex: 90\n',
      'ingestionTime': 1619559477143
    },]
  }] });
  useEffect(() => {
    (async () => {
      // const res = await fetch('http://localhost:3000/api/logs');
      // const { logs: fetchedLogs } = await res.json();

      // console.log(fetchedLogs);

      // setLogs(fetchedLogs);
    })();
  }, []);

  return (
    <>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Performance Snapshot
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <TrafficList />
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Monitored Services
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <ServicesList services={services} />
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Activity Log</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <LogTable logs={logs} />
          </div>
        </div>
      </div>
    </>
  );
}
