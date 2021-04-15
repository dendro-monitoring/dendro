import store from '../../store';
import { CustomApplicationData } from '../../store/vector/customApplication';

// TODO
const logConfig = ({ name, filepath }: CustomApplicationData): string => {
  console.log('Not Implemented');
  return '';
};

export const buildHostConfig = (): string => {
  let config = '';

  if (store.Vector.CustomApplications) {
    store.Vector.CustomApplications.forEach(customApp => {
      config += logConfig(customApp);
    });
  }

  return config;
};
