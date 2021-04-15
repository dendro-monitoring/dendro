import globalState from '../../globalState';
import { CustomApplicationData } from '../../globalState/vector/customApplication';

// TODO
const logConfig = ({ name, filepath }: CustomApplicationData): string => {
  console.log('Not Implemented');
  return '';
};

export const buildHostConfig = (): string => {
  let config = '';

  if (globalState.Vector.CustomApplications) {
    globalState.Vector.CustomApplications.forEach(customApp => {
      config += logConfig(customApp);
    });
  }

  return config;
};
