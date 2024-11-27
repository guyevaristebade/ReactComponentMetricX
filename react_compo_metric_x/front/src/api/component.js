import { instance } from '../helpers';

export const getTotalComponentCount = async () => {
  try {
    const response = await instance.get('/component/total');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching total component count:', error);
    return error.data;
  }
};

export const getComponentNoChild = async () => {
  try {
    const response = await instance.get('/component/without-children');
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const getAverageComponent = async () => {
  try {
    const response = await instance.get('/component/average');
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const getTopComponent = async () => {
  try {
    const response = await instance.get('/component/top');
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const getComponentsName = async () => {
  try {
    const response = await instance.get('/component/componentName');
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const topTenComponent = async () => {
  try {
    const response = await instance.get('/component/top10');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const fetchComponentByNameVersion = async (name, versionId) => {
  try {
    const response = await instance.get(
      `/component/${name}/versions/${versionId}/info`
    );
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const fetchAllVersionsByComponentName = async name => {
  try {
    const response = await instance.get(`/component/${name}/versions`);
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

/**
 *
 * @returns un tableau contenant les informations de répartition des composants par projets
 */
export const getRepartitionComponentPerProject = async () => {
  try {
    const response = await instance.get('/component/repartition/projects');
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

/**
 *
 * @param {String} name
 * @returns un tableau contenant les informations avec la date la plus haute  d'un composant
 */
export const getComponentProps = async name => {
  try {
    const response = await instance.get(`/component/props/${name}`);
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

/**
 *
 * @param {String} name qui représente le nom du composant
 * @returns un tableau contenant les informations globales d'un composant
 */
export const getGlobalComponentInfo = async name => {
  try {
    const response = await instance.get(`/component/global-info/${name}`);
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};

export const getComponentByNameVersion = async (name, versionId) => {
  try {
    const response = await instance.get(
      `/component/${name}/versions/${versionId}/info`
    );
    return response.data.data;
  } catch (error) {
    return error.data;
  }
};
