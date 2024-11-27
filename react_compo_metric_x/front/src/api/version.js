import { instance } from '../helpers/api';

export const getAllVersions = async () => {
  try {
    const response = instance.get('/version');
    return (await response).data.data;
  } catch (error) {
    return error.error.data;
  }
};

export const getAllVersionsByComponentName = async name => {
  try {
    const response = instance.get(`/version/${name}`);
    return (await response).data.data;
  } catch (error) {
    return error.error.data;
  }
};
