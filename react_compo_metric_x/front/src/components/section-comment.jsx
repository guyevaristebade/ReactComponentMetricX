import React, { useState } from 'react';
import { Form, Button, Input, Divider } from 'antd';

const { TextArea } = Input;

export const SectionComment = ({ feedbackId }) => {
  const [commentValue, setCommentValue] = useState('');

  function handlerChangeComment(e) {
    setCommentValue(e.target.value);
  }

  return (
    <div>
      <Divider />
      <Form.Item>
        <TextArea rows={2} onChange={handlerChangeComment} />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' type='primary'>
          Ajouter un commentaire
        </Button>
      </Form.Item>
    </div>
  );
};

export default SectionComment;
