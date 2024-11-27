import React, { useEffect, useState } from 'react';
import { Component } from '../components';
import { parseJSON } from '../helpers';
import { DeleteOutlined } from '@ant-design/icons';
import '../assets/Pinned.scss';
import { Col, Input, Row, Typography, message, Modal, Empty } from 'antd';
const { confirm } = Modal;
const { Title } = Typography;

export const Pinned = () => {
  const [pinnedComponents, setPinnedComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const storedPinnedComponents =
      parseJSON(localStorage.getItem('pinnedComponents')) || [];
    setPinnedComponents(storedPinnedComponents);
  }, []);
  const filterSearchTerm = pinnedComponents.filter(pinnedComponent =>
    pinnedComponent.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleRightClickPinned = (event, pinnedComponent) => {
    event.preventDefault();
    confirm({
      title: `Voulez-vous désépingler ${pinnedComponent} ?`,
      icon: <DeleteOutlined />,
      onOk() {
        const updatedPinnedComponents =
          parseJSON(localStorage.getItem('pinnedComponents')) || [];
        const newPinnedComponents = updatedPinnedComponents.filter(
          component => component !== pinnedComponent
        );
        localStorage.setItem(
          'pinnedComponents',
          JSON.stringify(newPinnedComponents)
        );
        setPinnedComponents(newPinnedComponents);
        message.success(`${pinnedComponent} a été désépinglé.`);
      },
      onCancel() {},
    });
  };
  return (
    <>
      <Title level={1}>Composants épinglés</Title>
      {pinnedComponents.length > 0 ? (
        <div className='pinnedComponent'>
          <Input
            className='search'
            placeholder='Rechercher un composant'
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            size='large'
          />
          <Row gutter={[16, 16]}>
            {filterSearchTerm.map((pinnedComponent, index) => (
              <Col key={index} xs={24} sm={12} md={8}>
                <div
                  onContextMenu={event =>
                    handleRightClickPinned(event, pinnedComponent)
                  }
                  style={{ cursor: 'context-menu' }}
                >
                  <Component
                    component={pinnedComponent}
                    style={{ margin: '8px 0' }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <Empty description='Aucun composant épinglé' />
      )}
    </>
  );
};
