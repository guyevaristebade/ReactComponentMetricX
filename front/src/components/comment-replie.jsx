import React from 'react';
import { CommentList } from '.';

export const CommentReplie = ({ comments }) => {
  return (
    <div>
      <CommentList comments={comments} />
    </div>
  );
};
