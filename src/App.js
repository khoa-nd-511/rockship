import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Layout from './containers/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import AddPost from './containers/AddPost/AddPost';
import Show from './containers/Show/Show';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/add" component={AddPost} />
          <Route exact path="/show" component={Show} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
