import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import './Sidedrawer.css'
import Auth from '../../containers/Auth/Auth';

const sidedrawer = props => {
  const { showSidedrawer, closeSidedrawerHandler } = props;

  const listItemArr = [
    {
      path: '/',
      label: 'Dashboard',
      exact: true
    },
    {
      path: '/my-posts',
      label: 'Your Posts',
    },
    {
      path: '/add',
      label: 'Add Post',
    },
  ];

  const listItems = listItemArr.map(({ path, label, exact }) => (
    <NavLink
      key={label}
      className="navLink"
      to={path}
      exact={exact}
      onClick={closeSidedrawerHandler}
    >
      <ListGroup.Item className="navLink_item">
        {label}
      </ListGroup.Item>
    </NavLink>
  ))

  return (
    <div className={['sidedrawer', showSidedrawer ? 'showed' : 'close'].join(' ')}>
      <nav className="sidedrawer--nav">
        <ListGroup variant="flush">
          {listItems}
          <br />
          <Auth />
        </ListGroup>;
      </nav>
    </div>
  )
}

export default sidedrawer
