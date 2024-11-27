import React, { useState, useEffect } from 'react';
import {Input, Typography, Spin, Row} from 'antd';
import { getAllFeedBack } from '../api';
import { FeedBack } from '../components';
import '../assets/FeedBackWatch.scss';

const { Title } = Typography;

export const FeedbackWatch = () => {
  const [feedBacks, setFeeBacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFeedBack().then(query => {
      setFeeBacks(query);
      setLoading(false);
    });
  }, []);

  // Filtrer les feedbacks en fonction du terme de recherche
  const filteredFeedBacks = feedBacks.filter(feedBack =>
    feedBack.componentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='feedback-watch'>
      <Title level={1}>Retrouvez tous les feedbacks</Title>
      <Input
        placeholder='Rechercher le feedback sur un composant en particulier '
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {loading ? (
        <Spin size='large' />
      ) : (
        <Row gutter={[8, 8]} >
          {filteredFeedBacks.map(feedBack => (
            <FeedBack key={feedBack._id} feedBack={feedBack} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default FeedbackWatch;
