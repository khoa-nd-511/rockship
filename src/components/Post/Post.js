import React from 'react';
import { Button, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';

import './Post.css';

const post = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={4}>
          <Card className="post">
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <div className="chip">
                  <img src="https://lh5.googleusercontent.com/-UZT5GSUGLd4/AAAAAAAAAAI/AAAAAAAAA-A/I_aPa22vfq4/photo.jpg" alt="asd" />
                  <a href="!#">Khoa Nguyen</a>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" block>Read more</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default post;
