import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as _ from 'lodash';

import AuthContext from '../../context/authContext';
import Button from 'react-bootstrap/Button';

const config = {
  apiKey: "AIzaSyDZohkqfheBvBmpye5HWNTab8ceXWFAjXI",
  authDomain: "rockship-adbe4.firebaseapp.com",
  databaseURL: "https://rockship-adbe4.firebaseio.com",
  projectId: "rockship-adbe4",
  storageBucket: "rockship-adbe4.appspot.com",
  messagingSenderId: "1055578856071"
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
};

const Auth = props => {
  const context = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const currentUser = _.pick(user, ['displayName', 'photoURL', 'email', 'uid']);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        context.logIn(currentUser)
      }
    })
  }, [context.isLoggedIn]);


  const logoutHandler = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('firebaseui::rememberedAccounts');

    firebase.auth().signOut();
    context.logOut()
    props.history.push('/');
  }

  return (
    context.isLoggedIn
      ? (
        <div style={{
          width: '85%',
          margin: 'auto'
        }}>
          <p>Welcome back, {context.currentUser && context.currentUser.displayName}</p>
          <Button
            variant="primary"
            block
            onClick={logoutHandler}>Sign out</Button>
        </div>
      )
      : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}

export default withRouter(Auth)