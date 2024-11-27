import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { fetchComponentGlobalStats } from '../api';
import { GlobalView, VersionView } from '../components';
import '../assets/ComponentDetails.scss';

export const ComponentDetails = () => {
  const { name } = useParams();
  const [globalViewData, setGlobalViewData] = useState({
    count: 0,
    children: [],
    props: [],
    version: [],
    project: [],
  });

  useEffect(() => {
    // fetchData()
  }, [name]);

  // async function fetchData() {
  //     try {
  //         const result = await fetchComponentGlobalStats(name);

  //         setGlobalViewData({...globalViewData,
  //             count : result.count,
  //             children : result.children,
  //             props : result.props,
  //             version : result.versionNames,
  //             project : result.projectNames
  //         })

  //     } catch (error) {
  //         console.error('Erreur lors de la récupération des statistiques du composant :', error);
  //     }
  // }

  const items = [
    {
      key: '1',
      label: 'Global View',
      children: <GlobalView componentName={name} />,
    },
    {
      key: '2',
      label: 'Version View',
      children: <VersionView componentName={name} />,
    },
  ];

  return (
    <div className='componentDetails'>
      <Tabs items={items} defaultActiveKey='1' />
    </div>
  );
};
