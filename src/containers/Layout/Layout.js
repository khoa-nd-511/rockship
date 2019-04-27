import React, { Component, Fragment } from 'react';
import { Container, Row } from 'react-bootstrap';

import Sidedrawer from '../../components/Sidedrawer/Sidedrawer';
import Header from '../../components/Header/Header';
import Backdrop from '../../components/Backdrop/Backdrop';

export class Layout extends Component {
  state = {
    showSidedrawer: false
  }

  showSidedrawerHandler = () => {
    this.setState((prev, next) => {
      return {
        showSidedrawer: !prev.showSidedrawer
      }
    })
  }

  closeSidedrawerHandler = () => {
    this.setState({ showSidedrawer: false })
  }

  render() {
    const { showSidedrawer } = this.state;

    return (
      <Fragment>
        <Header toggleSidedrawer={this.showSidedrawerHandler} showSidedrawer={showSidedrawer} />
        <div>
          <Container>
            <Row>
              {this.props.children}
            </Row>
          </Container>
          <Sidedrawer showSidedrawer={showSidedrawer} />
          <Backdrop showSidedrawer={showSidedrawer} clodeSidedrawer={this.closeSidedrawerHandler} />
        </div>
      </Fragment>
    )
  }
}

export default Layout
