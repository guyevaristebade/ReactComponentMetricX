import { instance } from '../helpers';

export const postFeedback = async body_request => {
  try {
    const response = await instance.post('/feedback', body_request);
    return response.data.succes;
  } catch (error) {
    console.error(`postFeedback : ${error.message}`);
    return error.message;
  }
};

export const getAllFeedBack = async () => {
  try {
    const response = await instance.get('/feedback');
    return response.data.data;
  } catch (error) {
    console.error(`getAllFeedBack : ${error.message}`);
    return error;
  }
};
