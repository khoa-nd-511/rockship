// Import FirebaseAuth and firebase.
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as _ from 'lodash';

import Button from 'react-bootstrap/Button';

// Configure Firebase.
var config = {
  apiKey: "AIzaSyDZohkqfheBvBmpye5HWNTab8ceXWFAjXI",
  authDomain: "rockship-adbe4.firebaseapp.com",
  databaseURL: "https://rockship-adbe4.firebaseio.com",
  projectId: "rockship-adbe4",
  storageBucket: "rockship-adbe4.appspot.com",
  messagingSenderId: "1055578856071"
};
firebase.initializeApp(config);


class Auth extends Component {
  state = {
    loggedIn: false,
    user: null
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/signedIn',
    // Display Google as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
  };

  logoutHandler = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('firebaseui::rememberedAccounts');

    firebase.auth().signOut();
    this.setState({ user: null, loggedIn: false })
    this.props.history.push('/');
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, loggedIn: true })
        const currentUser = _.pick(user, ['displayName', 'photoURL', 'email', 'uid']);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    })
  }

  render() {
    const { loggedIn, user } = this.state;

    return (
      loggedIn
        ? (
          <div style={{
            width: '85%',
            margin: 'auto'
          }}>
            <p>Welcome back, {user.displayName}</p>
            <Button
              variant="primary"
              block
              onClick={this.logoutHandler}>Sign out</Button>
          </div>
        )
        : <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
    );
  }
}

export default withRouter(Auth)