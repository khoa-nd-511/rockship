import React, { useState, useReducer } from 'react';
import { Container, Row } from 'react-bootstrap';

import AuthContext from '../../context/authContext';
import { reducer, initialState } from '../../context/authReducer';
import Sidedrawer from '../../components/Sidedrawer/Sidedrawer';
import Header from '../../components/Header/Header';
import Backdrop from '../../components/Backdrop/Backdrop';

const Layout = props => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser, isLoggedIn } = state;

  const showSidedrawerHandler = () => {
    setShowSidedrawer(true);
  }

  const closeSidedrawerHandler = () => {
    setShowSidedrawer(false);
  }

  const logIn = (user) => {
    dispatch({ type: 'LOG_IN', currentUser: user })
  }
  const logOut = () => {
    dispatch({ type: 'LOG_OUT' })
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn,
      logIn,
      logOut
    }}>
      <Header toggleSidedrawer={showSidedrawerHandler} showSidedrawer={showSidedrawer} />
      <div style={{ marginTop: 'calc(2rem + 72px)' }}>
        <Container>
          <Row>
            {props.children}
          </Row>
        </Container>
      </div>
      <Sidedrawer showSidedrawer={showSidedrawer} closeSidedrawerHandler={closeSidedrawerHandler} />
      <Backdrop showSidedrawer={showSidedrawer} clodeSidedrawer={closeSidedrawerHandler} />
    </AuthContext.Provider>
  )
}

export default Layout
