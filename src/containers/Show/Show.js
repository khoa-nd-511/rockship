import React, { Fragment } from 'react';
import renderHtml from 'react-render-html';
import { pipe } from 'rxjs';
import { ajax } from "rxjs/ajax"
import { map, startWith, switchMap } from "rxjs/operators"
import { streamProps } from 'react-streams';
import { Col } from 'react-bootstrap';

const paper = {
  boxShadow: '1px 1px 1px rgba(0,0,0,0.1)',
  borderRadius: '0.5rem',
  border: '1px solid rgba(0,0,0,0.1)',
  padding: '0.8rem',
}

const fetchSinglePost = pipe(
  switchMap(({ postId }) => ajax(`https://rockship-adbe4.firebaseio.com/posts/${postId}.json`).pipe(
    map(data => data.response),
    map(res => {
      if (!res) {
        return {
          message: 'Failed to fetched!'
        }
      }

      return {
        post: res,
        message: ''
      }
    })
  )),
  startWith({ post: null, message: 'Fetching ...' })
)

const Show = streamProps(fetchSinglePost);

export default () => {
  const postId = window.location.search.split('id=')[1];

  return (
    <Show postId={postId}>
      {({ post, message }) => (
        <Fragment>
          {message !== '' && <Col xs={12}>{message}</Col>}
          {post && (
            <Fragment>
              <Col xs={12}>
                <div style={paper}>
                  <h2>{post.title}</h2>
                </div>
              </Col>
              <Col xs={12} lg={8} className="mt-3">
                <div style={paper}>{renderHtml(post.body)}</div>
              </Col>
              <Col xs={12} lg={4} className="mt-3 ml-auto">
                <div style={paper}>
                  <h4><b>Author</b></h4>
                  <p>{post.author.displayName}</p>
                </div>
              </Col>
            </Fragment>
          )}
        </Fragment>
      )}
    </Show>
  )
}