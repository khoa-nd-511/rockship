import React, { Fragment, Component } from 'react';
import renderHtml from 'react-render-html';
import { Col, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const paper = {
  boxShadow: '1px 1px 1px rgba(0,0,0,0.1)',
  borderRadius: '0.5rem',
  border: '1px solid rgba(0,0,0,0.1)',
  padding: '0.8rem',
}

class PostDisplay extends Component {
  state = {
    show: false
  }

  render() {
    const { title, body, authorName, } = this.props

    return (
      <Fragment>
        <Col xs={12}>
          <div style={paper}>
            <h2>{title}</h2>
          </div>
        </Col>
        <Col xs={12} lg={8} className="mt-3">
          <div style={paper}>{renderHtml(body)}</div>
        </Col>
        <Col xs={12} lg={4} className="mt-3 ml-auto">
          <div style={paper}>
            <h4><b>Author</b></h4>
            <p>{authorName}</p>
          </div>
        </Col>
        <Col xs={12} style={{ padding: '0.8rem' }}>
          <Button variant="success" block className="mt-3">
            Edit
          </Button>
          <Button
            variant="danger"
            block className="mt-3"
            onClick={() => this.setState({ show: true })}>
            Delete
          </Button>
        </Col>
        <SweetAlert show={this.state.show} title="Delete this post" text="Are you sure?" confirm={() => console.log('Deleting')} />
      </Fragment>
    )
  }
}

export default PostDisplay;