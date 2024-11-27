import React from 'react';
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

export const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} replies`}
    itemLayout='horizontal'
    renderItem={props => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={<a href='#'>{props.author}</a>}
          description={props.content}
        />
        <div>{moment(props.datetime).fromNow()}</div>
      </List.Item>
    )}
  />
);
