import { Layout, Button } from 'antd';
import React from 'react';
import '../assets/top-bar.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const { Header } = Layout;

export const TopBar = ({ open, handlerOpen }) => {
  return (
    <Header className='top-bar' theme={"dark"}>
      <Button className='btn-menu' onClick={handlerOpen} type='text'>
        {open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </Button>
    </Header>
  );
};
