import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';
import '../assets/component.scss';
const { Title } = Typography;
export const Component = ({ component }) => {
  return (
    <Link to={`/overview/component/${component}`} className='component'>
      <Card className='componentCard'>
        <Title className='componentName' level={2}>
          {component}
        </Title>
      </Card>
    </Link>
  );
};
