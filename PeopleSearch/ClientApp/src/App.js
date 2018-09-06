import React from 'react';
import { Route } from 'react-router';
import Layout from './components/layout/Layout';
import People from './components/people/People';
import About from './components/about/About';

export default () => (
  <Layout>
    <Route exact path='/' component={People} />
    <Route path='/home' component={People} />
    <Route path='/about' component={About} />
  </Layout>
);
