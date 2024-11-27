import React from 'react';
import { Layout, Flex, Typography, Menu} from 'antd';
import { Link } from 'react-router-dom';
const { Header,  } = Layout;
const { Title } = Typography;


export const NavBar = () => {
    return (
        <Header>
            <Flex align='center'>
                <Title className='logo' style={{ color: 'white' }} level={3}><Link to='/dashboard'>{'<Dashboard/>'}</Link></Title>
            </Flex>
            <Menu
            theme="dark"
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
            />
        </Header>
    )
}
