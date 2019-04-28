import React, { Fragment } from 'react';
import { pipe } from 'rxjs';
import { ajax } from "rxjs/ajax"
import { map, startWith, switchMap } from "rxjs/operators"
import { streamProps } from 'react-streams';
import { Col } from 'react-bootstrap';
import PostDisplay from './PostDisplay/PostDisplay';

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
);

const Show = streamProps(fetchSinglePost);

export default () => {
  const postId = window.location.search.split('id=')[1];

  return (
    <Show postId={postId}>
      {({ post, message }) => (
        <Fragment>
          {message !== '' && <Col xs={12}>{message}</Col>}
          {post && (
            <PostDisplay title={post.title} body={post.body} authorName={post.author.displayName} />
          )}
        </Fragment>
      )}
    </Show>
  )
}