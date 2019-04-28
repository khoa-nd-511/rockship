import React from 'react';
import { Button, Card, ListGroup, Col } from 'react-bootstrap';

import './Post.css';

const post = props => {
  const { title, description } = props.post;
  console.log(props.post)
  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="post">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
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
  )
}

export default post;
