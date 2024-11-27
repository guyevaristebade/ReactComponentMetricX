import React, { useState, useEffect } from 'react';
import { getComponentsName, postFeedback } from '../api';
import { Button, Form, Input, Select, Row, Result, Spin } from 'antd';
import Confetti from 'react-confetti';
import '../assets/FeedBackForm.scss';
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

export const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    component: '',
    message: '',
  });

  const [components, setComponents] = useState([]);

  const [success, setSuccess] = useState(false);

  const handlerChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleComponentChange = value => {
    setFormData({ ...formData, component: value });
  };

  const handlerSubmitForm = async () => {
    await postFeedback(formData);
    setSuccess(true);
    handlerShowSuccessMessage();
  };

  const handlerShowSuccessMessage = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  useEffect(() => {
    getComponentsName()
      .then(data => setComponents(data))
      .catch(() => setComponents([]));
  }, []);

  if (components.length < 0 && !components) {
    return <Spin fullscreen={true} size='large' />;
  }

  return (
    <div className='container-form'>
      {success && <Confetti className='confetti' initialVelocityY={2} />}
      {success ? (
        <>
          <Result
            status='success'
            title='Votre feedback à été posté avec success!'
            subTitle='Patientez 3s avant de repartir ...'
          />
          <Spin size='large' fullscreen={true} />
        </>
      ) : (
        <Form
          className='form'
          layout='vertical'
          style={{ padding: '10px' }}
          onFinish={handlerSubmitForm}
        >
          <Item name='firstName' label='Nom' rules={[{ required: true }]}>
            <Input
              name='firstName'
              placeholder='Nom'
              onChange={handlerChange}
              value={formData.firstName}
              size='large'
            />
          </Item>

          <Item name='lastName' label='Prenom' rules={[{ required: true }]}>
            <Input
              name='lastName'
              placeholder='Prenom'
              value={formData.lastName}
              onChange={handlerChange}
              size='large'
            />
          </Item>

          <Item name='title' label='Titre' rules={[{ required: true }]}>
            <Input
              name='title'
              placeholder='Titre'
              onChange={handlerChange}
              value={formData.title}
              size='large'
            />
          </Item>

          <Item name='component' label='Composant' rules={[{ required: true }]}>
            <Select
              placeholder={'Choississez...'}
              onChange={handleComponentChange}
              size='large'
            >
              {components &&
                components.map((component, index) => (
                  <Option key={index} value={component}>
                    {component}
                  </Option>
                ))}
            </Select>
          </Item>

          <Item name='message' label='Commentaire' rules={[{ required: true }]}>
            <TextArea
              name='message'
              rows={4}
              placeholder='Écrivez votre commentaire ici'
              onChange={handlerChange}
              value={formData.message}
            />
          </Item>

          <Row className='form-btn'>
            <Button
              className='feedback-submit'
              type='primary'
              htmlType='submit'
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.title ||
                !formData.component ||
                !formData.message
              }
            >
              Soumettre
            </Button>
          </Row>
        </Form>
      )}
    </div>
  );
};
