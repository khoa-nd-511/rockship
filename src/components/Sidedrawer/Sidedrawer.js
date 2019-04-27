import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import './Sidedrawer.css'
import Auth from '../../containers/Auth/Auth';

const sidedrawer = props => {
  const { showSidedrawer } = props;

  return (
    <div className={['sidedrawer', showSidedrawer ? 'showed' : 'close'].join(' ')}>
      <nav className="sidedrawer--nav">
        <ListGroup variant="flush">
          <NavLink className="navLink" to="/" exact>
            <ListGroup.Item className="navLink_item">
              Dashboard
            </ListGroup.Item>
          </NavLink>
          <NavLink className="navLink" to="posts">
            <ListGroup.Item className="navLink_item">
              Your Posts
            </ListGroup.Item>
          </NavLink>
          <NavLink className="navLink" to="add">
            <ListGroup.Item className="navLink_item">
              Add Post
            </ListGroup.Item>
          </NavLink>
          <br />
          <Auth />
        </ListGroup>;
      </nav>
    </div>
  )
}

export default sidedrawer
