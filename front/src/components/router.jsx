import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '.';
import {
  Unknown,
  Dashboard,
  FeedbackPost,
  FeedbackWatch,
  Changelog,
  Overview,
  ComponentDetails,
  Pinned,
  Developper,
  PostJson,
} from '../pages';

export const Router = () => {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route index element={<Dashboard />} />
        <Route path='feedback-post' element={<FeedbackPost />} />
        <Route path='feedback-watch' element={<FeedbackWatch />} />
        <Route path='overview' element={<Overview />} />
        <Route path='changelog' element={<Changelog />} />
        <Route path='developpers' element={<Developper />} />
        <Route path='post-project' element={<PostJson />} />
        <Route path='overview/component/:name' element={<ComponentDetails />} />
        <Route path='components/pinned' element={<Pinned />} />
      </Route>
      <Route path='*' element={<Unknown />} />
    </Routes>
  );
};
