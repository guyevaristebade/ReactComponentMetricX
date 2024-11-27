import React, { useEffect, useState } from 'react';
import {Card, Typography, Tag, Layout, Col, Row} from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export const FeedBack = ({ feedBack }) => {
  const [tagColor, setTagColor] = useState('#');

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  useEffect(() => {
    const randomColor = getRandomColor();
    setTagColor(randomColor);
  }, []);

  return (
      <Col span={12}>
        <Card className='feedback-card'>
          <Title level={3}>{feedBack.title}</Title>
          <Tag className='componentName' color={tagColor}>
            {feedBack.componentName}
          </Tag>
          <Content>
            <Paragraph ellipsis={{ rows: 2, expandable: true }}>
              {feedBack.message}
            </Paragraph>
          </Content>
        </Card>
      </Col>
  );
};
