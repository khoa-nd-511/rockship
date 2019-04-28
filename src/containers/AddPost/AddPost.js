import React, { Component, Fragment } from 'react'
import { withFormik, Field } from 'formik';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import renderHtml from 'react-render-html';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './AddPost.css';

export class AddPost extends Component {
  state = {
    body: ''
  };

  bodyChangedHandler = (html) => {
    this.setState({ body: html })
  }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;

    return (
      <Container>
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
                        value={ form.status && form.status.success ? '' : this.state.body}
                        formats={AddPost.formats}
                        modules={AddPost.modules}
                      />
                      {errors.body && touched.body && <div id="feedback">{errors.body}</div>}
                    </Fragment>
                  )}
                </Field>

              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>

          </Col>
        </Row>
      </Container >
    )
  }
}

AddPost.modules = {
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

AddPost.formats = [
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
    fetch('https://rockship-adbe4.firebaseio.com/posts.json', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    }).then(data => data.json()).then(res => {
      setStatus({ success: true })
      resetForm()
    })
  },

  displayName: 'Add Post Form',
})(AddPost);
