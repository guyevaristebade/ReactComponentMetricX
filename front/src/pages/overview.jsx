import React, { useEffect, useState } from 'react';
import { Component } from '../components';
import { getComponentsName } from '../api';
import { DeleteOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Input, message, Modal, Spin, Pagination,Flex } from 'antd';
import '../assets/OverView.scss';

const { Title } = Typography;
const { confirm } = Modal;

export const Overview = () => {
  const [components, setComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getComponentsName()
      .then(data => {
        setComponents(data);
        setLoading(false);
      })
      .catch(e => {
        console.error('error fetching components name  ' + e.message);
        setComponents([]);
      });
  }, []);

  const handleRightClickPin = (event, component) => {
    event.preventDefault();

    confirm({
      title: `Voulez-vous épingler ${component}`,
      icon: <DeleteOutlined />,
      onOk() {
        const storedPinnedComponents =
          JSON.parse(localStorage.getItem('pinnedComponents')) || [];
        const isAlreadyPinned = storedPinnedComponents.some(
          pinned => pinned === component
        );

        if (!isAlreadyPinned) {
          const updatedPinnedComponents = [
            ...storedPinnedComponents,
            component,
          ];
          localStorage.setItem(
            'pinnedComponents',
            JSON.stringify(updatedPinnedComponents)
          );
          message.success(`${component} has been pinned.`);
        }
      },
      onCancel() {},
    });
  };

  const filteredComponents = components.filter(component =>
    component.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedComponents = filteredComponents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className='overview'>
      <Title level={1}>{"Vue d'ensemble"}</Title>
      <Input
        className='search'
        placeholder='Rechercher un composant'
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
        size='large'
      />

      {loading ? (
        <Spin size='large' fullscreen={true} />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {paginatedComponents.map((component, index) => (
              <Col key={index} xs={24} sm={12} md={8}>
                <div
                  onContextMenu={event => handleRightClickPin(event, component)}
                  style={{ cursor: 'context-menu' }}
                >
                  <Component component={component} />
                </div>
              </Col>
            ))}
          </Row>
          <Flex justify='flex-end'>
            <Pagination
              style={{ margin: '1rem', float: 'right'}}
              current={currentPage}
              pageSize={pageSize}
              total={filteredComponents.length}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={[pageSize]}
            />
          </Flex>
        </>
      )}
    </div>
  );
};