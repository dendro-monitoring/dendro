import AWSWrapper from '../..';

export default function deleteFirehose(): Promise<any> {
  return AWSWrapper.deleteDeliveryStream();
}

