import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import {Sidebar, TopBar} from '.';
import '../assets/container.scss';
const { Content } = Layout;

export const Container = () => {

  const [open, setOpen] = useState(true);

  const handlerOpen = () => {
    setOpen(!open);
  };

  return (
    <Layout className='layout-container' style={{ maxHeight: '100vh' }}>
      <Sidebar open={open} />
      <Layout className='content-container' style={{ height: '100vh' }}>
        <TopBar open={open} handlerOpen={handlerOpen} />
        <Content className='main-content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
