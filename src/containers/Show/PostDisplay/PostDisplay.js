import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import renderHtml from 'react-render-html';
import { Col, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const paper = {
  boxShadow: '1px 1px 1px rgba(0,0,0,0.1)',
  borderRadius: '0.5rem',
  border: '1px solid rgba(0,0,0,0.1)',
  padding: '0.8rem',
  wordBreak: 'break-all',
}

class PostDisplay extends Component {
  state = {
    show: false,
    swalTitle: '',
    swalText: ''
  }

  render() {
    const { title, body, postId, authorName, authorEmail } = this.props;
    const { showSwal, swalTitle, swalText } = this.state;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
        {(!currentUser || authorEmail === currentUser.email) && (
          <Col xs={12} style={{ padding: '0.8rem' }}>
            <Button variant="success" block className="mt-3">
              Edit
          </Button>
            <Button
              variant="danger"
              block className="mt-3"
              onClick={() => this.setState({ showSwal: true, swalTitle: "Delete this post", swalText: "Are you sure?" })}>
              Delete
          </Button>
          </Col>
        )}
        <SweetAlert
          show={showSwal}
          title={swalTitle}
          text={swalText}
          showCancelButton
          type="warning"
          onEscapeKey={() => this.setState({ showSwal: false })}
          onOutsideClick={() => this.setState({ showSwal: false })}
          onCancel={() => this.setState({ showSwal: false })}
          onConfirm={() => {
            fetch(`https://rockship-adbe4.firebaseio.com/posts/${postId}.json`, {
              method: 'DELETE'
            }).then(data => data.json()).then(res => {
              this.setState({ showSwal: false });
              this.props.history.push('/')
            }).catch(err => console.log(err))
          }}
        />
      </Fragment>
    )
  }
}

export default withRouter(PostDisplay);