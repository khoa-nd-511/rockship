import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Layout from './containers/Layout/Layout';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={null} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
