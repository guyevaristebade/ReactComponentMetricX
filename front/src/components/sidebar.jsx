import React from 'react';
import '../assets/SideBar.scss';
import { Link } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { menuItems } from '../helpers';
const { Title } = Typography;
const { Sider } = Layout;

export const Sidebar = ({ open }) => {
  return (
    <Sider className='menu' style={{ height: '100vh' }} width={open ? 300 : 0}>
      {<Title className='logo'><Link to='/' style={{ textDecoration : "none" , color : "#fff"}}>{'<DSMX/>'}</Link></Title>}
      <Menu
        className='menu'
        mode='inline'
        theme='dark'
        defaultSelectedKeys={['1']}
        items={menuItems}
      />
    </Sider>
  );
};
