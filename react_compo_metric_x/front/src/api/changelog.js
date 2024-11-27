import { instance } from '../helpers/api';
export const getChangeLog = async () => {
  try {
    const response = await instance.get('/changelog');
    return response.data.content;
  } catch (error) {
    throw error;
  }
};
