import describeLogGroups from './describeLogGroups';
import describeLogStreams from './describeLogStreams';
import getEvents from '../../cloudwatch/getLogEvents';

export default function getLogs(): Promise<void>{
  return new Promise(async resolve => {
    const results: any = {};
    const logGroups = await describeLogGroups();
    logGroups.forEach( (group: { logGroupName: string}) => results[group.logGroupName] = group);

    for (const logGroupName of Object.keys(results)) {
      const logGroup = results[logGroupName];

      logGroup.logStreams = await describeLogStreams(logGroupName);

      for (const logStream of logGroup.logStreams) {
        const events = await(getEvents(logGroupName, logStream.logStreamName));

        logStream.events = events;
      }
    }
    resolve(results);
  });
}
