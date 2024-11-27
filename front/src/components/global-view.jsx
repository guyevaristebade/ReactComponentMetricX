import React, { useEffect, useState } from 'react';
import { Divider, Typography, Table, Row, Col, Card, Spin, Empty } from 'antd';
import { getGlobalComponentInfo } from '../api';
import ReactApexChart from 'react-apexcharts';

const { Title, Paragraph } = Typography;

export const GlobalView = ({ componentName }) => {
  const [globalViewData, setGlobalViewData] = useState({});
  const [childrenOptions, setChildrenOptions] = useState({});
  const [propsOptions, setPropsOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGlobalComponentInfo(componentName)
      .then(data => {
        setGlobalViewData(data);

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

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [componentName]);

  const propsDataSource = globalViewData.props
    ? Object.entries(globalViewData.props).map(([key, value], index) => ({
        key: index,
        name: key,
        values: Object.entries(value)
          .map(([val, count]) => `${val} : ${count}`)
          .join(',    '),
      }))
    : [];

  const childrensDataSource = globalViewData.children
    ? Object.entries(globalViewData.children).map(([key, value], index) => ({
        key: index,
        name: key,
        values: value,
      }))
    : [];

  return (
    <div>
      <Title level={1}>{componentName}</Title>
      <Paragraph>
        Ce composant est présent dans les versions suivantes :{' '}
      </Paragraph>
      <div className='version-container'>
        {globalViewData.versions &&
          globalViewData.versions.length > 0 &&
          globalViewData.versions.map(vers => (
            <Title key={vers} level={5}>
              {vers}
            </Title>
          ))}
      </div>
      <Divider />
      <div style={{ marginTop: '4rem' }}>
        <Title level={2}>Instanciation</Title>
        <Paragraph>
          Instanciation globale: {globalViewData.count} fois
        </Paragraph>
      </div>
      <Divider />
      <div>
        <Title level={2}>Projets</Title>
        <div className='projet-container'>
          {globalViewData.projects &&
            globalViewData.projects.length > 0 &&
            globalViewData.projects.map(project => (
              <Title level={5} key={project} className='projet'>
                {project}
              </Title>
            ))}
        </div>
      </div>
      <Divider />
      <div style={{ marginTop: '4rem' }}>
        <Title level={2}>Props</Title>
        {globalViewData.props &&
        Object.keys(globalViewData.props).length === 0 ? (
          <Empty />
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
            <Row  style={{marginTop : " 2rem"}} gutter={24} className='row'>
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
      <Divider />
      <div style={{ marginTop: '4rem' }}>
        <Title level={2}>Children</Title>
        {globalViewData.children &&
        Object.keys(globalViewData.children).length === 0 ? (
          <Empty description='Ce composant ne possède pas de children ' />
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
    </div>
  );
};
