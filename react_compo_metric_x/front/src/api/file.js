import { instance } from '../helpers';

export const postProject = async file => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await instance.post('/main', formData);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};
