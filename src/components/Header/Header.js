import React from 'react'
import { Container, Row, Navbar } from 'react-bootstrap';

import './Header.css';

const header = props => {
  const { toggleSidedrawer, showSidedrawer } = props;
  console.log(props)

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="brand_hamburger">
            <Navbar.Brand>Rockship Project</Navbar.Brand>
            <div className="hamburger" onClick={toggleSidedrawer}>
              <div className={['bar', showSidedrawer ? 'cross' : 'bars'].join(' ')}></div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}
export default header;