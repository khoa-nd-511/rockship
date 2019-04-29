import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Layout from './containers/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import PostForm from './containers/PostForm/PostForm';
import Show from './containers/Show/Show';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/add" component={PostForm} />
          <Route exact path="/show" component={Show} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
