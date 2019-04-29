import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { withFormik, Field } from 'formik';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './PostForm.css';
import AuthContext from '../../context/authContext';

export class PostForm extends Component {
  static contextType = AuthContext;

  state = {
    body: ''
  };

  bodyChangedHandler = (html) => {
    this.setState({ body: html })
  };

  componentDidMount = () => {
    const { body } = this.props.values;

    if (body !== '') {
      this.setState({ body })
    }
  }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      status,
      showEditForm,
      cancelEdit
    } = this.props;

    return (
      <Container>
        {(status || !this.context.isLoggedIn) && <Redirect to="/" />}
        <Row className="justify-content-center">
          <Col xs={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Post's title..."
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  name="title"
                />
                {errors.title && touched.title && <div id="feedback">{errors.title}</div>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>

                <Field name="body" value={values.body}>
                  {({ field, form }) => (
                    <Fragment>
                      <ReactQuill
                        {...field}
                        onChange={e => {
                          this.bodyChangedHandler(e)
                          form.setFieldValue('body', e)
                        }}
                        placeholder="Write something..."
                        value={this.state.body}
                        formats={PostForm.formats}
                        modules={PostForm.modules}
                      />
                      {errors.body && touched.body && <div id="feedback">{errors.body}</div>}
                    </Fragment>
                  )}
                </Field>

              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
              {showEditForm && <Button variant="info" type="button" onClick={cancelEdit}>Cancel</Button>}
            </Form>
          </Col>
        </Row>
      </Container >
    )
  }
}

PostForm.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [
      { 'list': 'ordered' },
      { 'list': 'bullet' },
      { 'indent': '-1' },
      { 'indent': '+1' }
    ],
  ],
}

PostForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline',
  'list', 'bullet', 'indent',
]

export default withFormik({
  mapPropsToValues: () => ({
    title: '',
    body: ''
  }),

  validate: values => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Title is required !';
    } else if (!values.body) {
      errors.body = 'Please write something !';
    }

    return errors;
  },

  handleSubmit: (values, { resetForm, setStatus }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    fetch('https://rockship-adbe4.firebaseio.com/posts.json', {
      method: 'POST',
      body: JSON.stringify({ ...values, author: currentUser, authorId: currentUser.uid, createdAt: new Date() }),
      headers: { 'Content-Type': 'application/json' }
    }).then(data => data.json()).then(res => {
      setStatus({ success: true })
      resetForm()
    })
  },

  displayName: 'Add Post Form',
})(PostForm);
