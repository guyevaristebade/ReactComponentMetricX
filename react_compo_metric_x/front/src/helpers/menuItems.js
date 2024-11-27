import {
  AppstoreOutlined,
  CodeOutlined,
  FileTextOutlined,
  MailOutlined,
  SendOutlined,
  EyeOutlined,
  PushpinOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const menuItems = [
  {
    key: '1',
    icon: <AppstoreOutlined />,
    label: <Link to='/'>DashBoard</Link>,
  },
  {
    key: '2',
    icon: <CodeOutlined />,
    label: <Link to='/overview'>Components</Link>,
  },
  {
    key: '3',
    icon: <MailOutlined />,
    label: 'Feedback',
    children: [
      {
        key: '3-1',
        icon: <SendOutlined />,
        label: <Link to='/feedback-post'>Post feedback</Link>,
      },
      {
        key: '3-2',
        icon: <EyeOutlined />,
        label: <Link to='/feedback-watch'>Watch feedback</Link>,
      },
    ],
  },
  {
    key: '4',
    icon: <PushpinOutlined />,
    label: <Link to='/components/pinned'>Pinned Components</Link>,
  },
  {
    key: '5',
    icon: <PlusOutlined />,
    label: <Link to='/post-project'>Add project</Link>,
  },
  {
    key: '6',
    icon: <FileTextOutlined />,
    label: <Link to='/changelog'>Changelog</Link>,
  },
];
