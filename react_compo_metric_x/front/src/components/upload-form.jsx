import React, { useState, useRef } from 'react';
import { message, Form, Button, Upload } from 'antd';
import { postProject } from '../api';
import { UploadOutlined } from '@ant-design/icons';

export const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (values) => {
    if (!file) {
      message.error('Please select file before to submit !!!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    postProject(file)
      .then(() => {
        message.success('Your project sent successfully');
        setFile(null);
      })
      .catch(() => {
        message.error('An error occurred while sending your project');
      });
  };

  const beforeUpload = (file) => {
    setFile(file);
    return false;
  };

  return (
    <Form
      className='post-json'
      onFinish={handleSubmit}
      style={{
        boxShadow: "4px 0 4px 4px rgba(0,0,0,0.1)",
        marginTop: "2rem",
        display: "flex",
        gap: "3rem",
        padding: "1rem"
      }}
    >
      <Form.Item>
        <Upload
          beforeUpload={beforeUpload}
          accept=".json"
          maxCount={1}
          showUploadList={{ showRemoveIcon: false }}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ cursor: "pointer" }}
        >
          Envoyer
        </Button>
      </Form.Item>
    </Form>
  );
};
