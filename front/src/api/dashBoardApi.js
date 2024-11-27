import { instance } from '../helpers';

export const fetchData = async endpoint => {
  try {
    const response = await instance.get(`/component/${endpoint}`);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const fetchTotalUniqueComponent = async () => {
  const data = await fetchData('/total');
  return data.total;
};

export const fetchTotalCount = async () => {
  const data = await fetchData('instances/total');
  return data.count;
};

export const fetchTopComponents = async () => {
  const data = await fetchData('top');
  return data;
};

export const fectchAllTeam = async () => {
  try {
    const responses = await instance.get('/teams');
    return responses.data;
  } catch (e) {
    throw e.message;
  }
};

export const fetchAllProjects = async () => {
  try {
    const responses = await instance.get('/project');
    return responses.data;
  } catch (e) {
    throw e.message;
  }
};

export const fetchAllversions = async () => {
  try {
    const responses = await instance.get('/version');
    return responses.data;
  } catch (e) {
    throw e.message;
  }
};

export const fetchRepartitionPerProject = async () => {
  try {
    const responses = await instance.get(
      '/version/projects/distribution-by-version'
    );
    return responses.data;
  } catch (e) {
    throw e.message;
  }
};
