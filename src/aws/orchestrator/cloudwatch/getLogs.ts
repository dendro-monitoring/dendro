import describeLogGroups from './describeLogGroups';
import describeLogStreams from './describeLogStreams';
import getEvents from '../../cloudwatch/getLogEvents';
import { AWS_LAMBDA_FUNCTION_NAME } from '../../../constants';

export default function getLogs(): Promise<void>{
  return new Promise(async resolve => {
    const logGroups = await describeLogGroups();
    const logGroup: any = logGroups.filter( group => group.logGroupName === `/aws/lambda/${AWS_LAMBDA_FUNCTION_NAME}`)[0];

    if (!logGroup) return;

    logGroup.logStreams = await describeLogStreams(logGroup.logGroupName);

    for (const logStream of logGroup.logStreams) {
      const events = await(getEvents(logGroup.logGroupName, logStream.logStreamName));

      logStream.events = events;
    }
    resolve(logGroup);
  });
}
