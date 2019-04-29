import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import renderHtml from 'react-render-html';
import { Col, Button } from 'react-bootstrap';
import Swal from '../../../components/Swal/Swal';
import { PostForm } from '../../PostForm/PostForm';
import { Formik } from 'formik';

const paper = {
  boxShadow: '1px 1px 1px rgba(0,0,0,0.1)',
  borderRadius: '0.5rem',
  border: '1px solid rgba(0,0,0,0.1)',
  padding: '0.8rem',
  wordBreak: 'break-all',
}

class PostDisplay extends Component {
  state = {
    showSwal: false,
    swalTitle: '',
    swalText: '',
    type: '',
    method: '',
    showPostForm: false
  }

  closeSwal = () => {
    this.setState({ showSwal: false })
  }

  confirmHandler = (method, postId) => {
    if (method === "DELETE") {
      fetch(`https://rockship-adbe4.firebaseio.com/posts/${postId}.json`, {
        method
      }).then(data => data.json()).then(res => {
        this.closeSwal()
        this.props.history.push('/')
      }).catch(err => console.log(err))
    }
  }

  cancelEditHandler = () => {
    this.setState({ showPostForm: false })
  }

  render() {
    const { title, body, postId, authorName, authorEmail } = this.props;
    const { showSwal, swalTitle, swalText, type, method, showPostForm } = this.state;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (!showPostForm
      ? (
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
            <Fragment>
              <Col xs={12} style={{ padding: '0.8rem' }}>
                <Button variant="success" block className="mt-3" onClick={() => this.setState({ showPostForm: true })}>
                  Edit
              </Button>
                <Button
                  variant="danger"
                  block className="mt-3"
                  onClick={() => this.setState({ showSwal: true, swalTitle: "Delete this post", swalText: "Are you sure?", method: "DELETE", type: "warning" })}>
                  Delete
            </Button>
              </Col>
              <Swal
                showSwal={showSwal}
                swalTitle={swalTitle}
                swalText={swalText}
                type={type}
                method={method}
                closeHandler={this.closeSwal}
                confirm={() => this.confirmHandler(method, postId)}
              />
            </Fragment>
          )}
        </Fragment>)
      : (
        <Formik
          initialValues={{ title, body }}
          onSubmit={(values) => {
            fetch(`https://rockship-adbe4.firebaseio.com/posts/${postId}.json`, {
              method: 'PUT',
              body: JSON.stringify({ ...values, author: currentUser }),
              headers: { 'Content-Type': 'application/json' }
            }).then(data => data.json()).then(res => {
              if (typeof (res) === 'object') {
                this.props.history.push('/')
              }
            }).catch(err => console.log(err))
          }}
          render={props => (<PostForm {...props} showEditForm={showPostForm} cancelEdit={this.cancelEditHandler} />)}
        />
      )
    )
  }
}

export default withRouter(PostDisplay);