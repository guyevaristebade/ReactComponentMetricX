import React from 'react';
import { FeedbackForm } from '../components';
import { Typography } from 'antd';
import '../assets/FeedBack.scss';
const { Title } = Typography;

export const FeedbackPost = () => {
  return (
    <div className='feedback-post'>
      <Title>Poster un feedback</Title>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPost;
