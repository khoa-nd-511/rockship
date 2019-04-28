import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, ListGroup, Col } from 'react-bootstrap';

import './Post.css';

const post = props => {
  const { postId, post } = props;
  const { title, author } = post;
  const { displayName, photoURL, email } = author;

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="post">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <div className="chip">
              <img src={photoURL} alt={displayName} />
              <a href={`mailto:${email}`}>{displayName}</a>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary" block onClick={() => props.history.push(`/show?id=${postId}`)} >
              Read more
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  )
}

export default withRouter(post);
