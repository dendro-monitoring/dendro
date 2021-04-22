import AWSWrapper from '../../aws';

export default function deleteFirehose(): Promise<any> {
  return AWSWrapper.deleteDeliveryStream();
}

