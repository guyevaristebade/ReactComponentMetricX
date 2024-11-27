import React, { useState, useEffect } from 'react';
import {
  Divider,
  Typography,
  Select,
  Row,
  Col,
  Card,
  Table,
  Empty,
} from 'antd';
import {
  getAllVersionsByComponentName,
  getComponentByNameVersion,
} from '../api';
import ReactApexChart from 'react-apexcharts';
const { Title, Paragraph } = Typography;
const { Option } = Select;

/**
 * TODO Changer le pie Chart en bar Chart
 */
export const VersionView = ({ componentName }) => {
  const [itemSelected, setItemSelected] = useState('');
  const [versions, setVersions] = useState([]);
  const [versionInfo, setVersionInfo] = useState({});
  const [childrenOptions, setChildrenOptions] = useState({});
  const [propsOptions, setPropsOptions] = useState({});

  
  useEffect(() => {
    getAllVersionsByComponentName(componentName).then(versionsData => {
      setVersions(versionsData);

      if (!itemSelected && versionsData.length > 0) {
        setItemSelected(versionsData[0].id);
      }
    });

    if (itemSelected) {
      getComponentByNameVersion(componentName, itemSelected)
        .then(data => {
          setVersionInfo(data);

          if (data.props) {
            const seriesData = Object.entries(data.props).map(
              ([propName, values]) => {
                const total = Object.values(values).reduce(
                  (sum, count) => sum + count,
                  0
                );
                return {
                  x: propName,
                  y: total,
                };
              }
            );

            const newPropsOptions = {
              series: [
                {
                  data: seriesData,
                },
              ],
              options: {
                legend: {
                  show: false,
                },
                chart: {
                  type: 'treemap',
                },
                title: {
                  text: 'Distribution des Props',
                  align: 'left',
                },
                plotOptions: {
                  treemap: {
                    distributed: true,
                    enableShades: false,
                  },
                },
              },
            };
            setPropsOptions(newPropsOptions);
          }

          if (data.children) {
            const names = Object.keys(data.children);
            const counts = Object.values(data.children);

            const newChildrenOptions = {
              series: counts,
              options: {
                chart: {
                  width: 380,
                  type: 'pie',
                },
                labels: names,
                title: {
                  text: `Répartition globale des enfants du composant ${componentName}`,
                  align: 'left',
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              },
            };
            setChildrenOptions(newChildrenOptions);
          }
        })
        .catch();
    }
  }, [componentName, itemSelected]);

  const handleVersionChange = value => {
    setItemSelected(value);
  };

  const propsDataSource = versionInfo.props
    ? Object.entries(versionInfo.props).map(([key, value], index) => ({
        key: index,
        name: key,
        values: Object.entries(value)
          .map(([val, count]) => `${val} : ${count}`)
          .join(',    '),
      }))
    : [];

  const childrensDataSource = versionInfo.children
    ? Object.entries(versionInfo.children).map(([key, value], index) => ({
        key: index,
        name: key,
        values: value
      }))
    : [];

  return (
    <>
      <Title level={1}>{componentName}</Title>
      <Divider />
      <div>
        <Paragraph>
          Choisissez la version que vous souhaitez consulter:
        </Paragraph>
        <Select
          style={{ width: '100px' }}
          size='large'
          defaultValue={'Choississez'}
          onChange={handleVersionChange}
          value={itemSelected}
        >
          {versions.map(vers => (
            <Option key={vers.id} value={vers.id}>
              {vers.version}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Title level={2}>Instanciation</Title>
        <Paragraph>
          Dans cette version ce composant a été instancié : {versionInfo.count}{' '}
          fois
        </Paragraph>
      </div>
      <div>
        <Title level={2}>Props</Title>
        {versionInfo.props && Object.keys(versionInfo.props).length === 0 ? (
          <Empty description='Ce composant ne possède aucune props ' />
        ) : (
          <>
            {propsOptions && propsOptions.series && (
              <Row gutter={24} className='row'>
                <Col span={24}>
                  <Card>
                    <ReactApexChart
                      options={propsOptions.options}
                      series={propsOptions.series}
                      type='treemap'
                      height={350}
                    />
                  </Card>
                </Col>
              </Row>
            )}
            <Row style={{marginTop : " 2rem"}} gutter={24} className='row'>
              <Col span={24}>
                <Card>
                  <Table
                    dataSource={propsDataSource}
                    columns={[
                      {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        width: 100,
                      },
                      {
                        title: 'Valeurs',
                        dataIndex: 'values',
                        key: 'values',
                        width: 100,
                      },
                    ]}
                    pagination={true}
                  />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
      <div style={{ marginTop: '4rem' }}>
        <Title level={2}>Childrens</Title>
        {versionInfo.children &&
        Object.keys(versionInfo.children).length === 0 ? (
          <Empty description='Ce composant ne possède pas de children' />
        ) : (
          <>
            {childrenOptions && childrenOptions.series && (
              <Row gutter={24} className='row'>
                <Col span={24}>
                  <Card>
                    <ReactApexChart
                      options={childrenOptions.options}
                      series={childrenOptions.series}
                      type='pie'
                      height={350}
                    />
                  </Card>
                </Col>
              </Row>
            )}

            <Row gutter={24} className='row' style={{ marginTop: '2rem' }}>
              <Col span={24}>
                <Card>
                  <Table
                    dataSource={childrensDataSource}
                    columns={[
                      {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        width: 100,
                      },
                      {
                        title: 'Valeurs',
                        dataIndex: 'values',
                        key: 'values',
                        width: 100,
                      },
                    ]}
                    pagination={true}
                  />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default VersionView;
