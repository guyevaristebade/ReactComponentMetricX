import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';
import {
  getTotalComponentCount,
  getComponentNoChild,
  getAverageComponent,
  topTenComponent,
  getRepartitionComponentPerProject,
} from '../api';
import '../assets/DashBoard.scss';
const { Title } = Typography;

export const Dashboard = () => {
  const [totalUniqueComponents, setTotalUniqueComponents] = useState(0);
  const [componentNoChild, setComponentNoChild] = useState(0);
  const [averageComponent, setAverageComponent] = useState(0);
  const [topTenComponentData, setTopTenComponentData] = useState({});
  const [repartitionComponentPerProject, setRepartitionComponentPerProject] =
    useState({});
  const [tcOption, settcOption] = useState({});
  const [repartitionOption, setRepartitionOption] = useState({});

  useEffect(() => {
    getTotalComponentCount().then(total => setTotalUniqueComponents(total));
    getComponentNoChild().then(child => setComponentNoChild(child));
    getAverageComponent().then(average => setAverageComponent(average));
    topTenComponent().then(top => setTopTenComponentData(top));
    getRepartitionComponentPerProject().then(repartition =>
      setRepartitionComponentPerProject(repartition)
    );
  }, []);

  useEffect(() => {
    if (topTenComponentData && topTenComponentData.length > 0) {
      const componentNames = topTenComponentData.map(
        component => component._id
      );
      const componentCounts = topTenComponentData.map(
        component => component.totalInstances
      );

      const newtcOption = {
        chart: {
          type: 'bar',
        },
        series: [
          {
            name: 'Nombre de composants',
            data: componentCounts,
          },
        ],
        xaxis: {
          categories: componentNames,
        },
        title: {
          text: 'Top 10 des composants les plus utilisés',
          align: 'left',
        },
      };
      settcOption(newtcOption);
    }
  }, [topTenComponentData]);

  useEffect(() => {
    if (
      repartitionComponentPerProject &&
      repartitionComponentPerProject.length > 0
    ) {
      const projectNames = repartitionComponentPerProject.map(
        project => project.name
      );
      const projectCounts = repartitionComponentPerProject.map(project =>
        Math.round(project.count)
      );

      const newRepartitionOption = {
        series: projectCounts,
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: projectNames,
          title: {
            text: 'Repartition des composants par projet',
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
      setRepartitionOption(newRepartitionOption);
    }
  }, [repartitionComponentPerProject]);

  return (
    <div className='dashboard'>
      <Title level={1}>Tableau de bord</Title>
      <Row gutter={16}>
        <Col span={8} xs={24} md={8}>
          <Card>
            <Statistic
              title='Nombre de composant total Unique'
              value={totalUniqueComponents}
            />
          </Card>
        </Col>
        <Col span={8} xs={24} md={8}>
          <Card>
            <Statistic
              title='Nombre total  de composant sans enfant'
              value={componentNoChild}
            />
          </Card>
        </Col>
        <Col span={8} xs={24} md={8}>
          <Card>
            <Statistic
              title='Moyenne de composant par projet'
              value={averageComponent}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24} className='row'>
        <Col span={24}>
          <Card>
            {tcOption && tcOption.series && tcOption.series.length > 0 && (
              <ReactApexChart
                options={tcOption}
                series={tcOption.series}
                type='bar'
                height={350}
              />
            )}
          </Card>
        </Col>
      </Row>
      <Row gutter={24} className='row'>
        <Col span={24}>
          <Card>
            {repartitionOption &&
              repartitionOption.series &&
              repartitionOption.series.length > 0 && (
                <ReactApexChart
                  options={repartitionOption.options}
                  series={repartitionOption.series}
                  type='pie'
                  height={350}
                />
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
