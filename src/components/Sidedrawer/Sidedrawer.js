import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/authContext';
import { ListGroup } from 'react-bootstrap';
import Auth from '../../containers/Auth/Auth';
import './Sidedrawer.css'

const Sidedrawer = props => {
  const { showSidedrawer, closeSidedrawerHandler } = props;
  const context = useContext(AuthContext)

  const listItemArr = context.isLoggedIn
    ? [{ path: '/', label: 'Dashboard', exact: true }, { path: '/posts', label: 'Your Posts', }, { path: '/add', label: 'Add Post', },]
    : [{ path: '/', label: 'Dashboard', exact: true }];

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

export default Sidedrawer
