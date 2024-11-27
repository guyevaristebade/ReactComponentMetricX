import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getChangeLog } from '../api';
import '../assets/ChangeLog.scss';
import { Spin } from 'antd';

export const Changelog = () => {
  const [changeLog, setChangeLog] = useState('');

  useEffect(() => {
    getChangeLog()
      .then(data => setChangeLog(data))
      .catch(err => setChangeLog(''));
  }, [changeLog]);

  if (!changeLog) {
    return <Spin size='large' fullscreen={true} />;
  }

  return (
    <div className='changelog'>
      <Markdown>{changeLog}</Markdown>
    </div>
  );
};
