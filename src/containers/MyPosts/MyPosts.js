import React, { Fragment } from 'react';

import { Table, Col } from 'react-bootstrap';
import { pipe } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { streamProps } from 'react-streams';
import { startWith, map, switchMap, tap } from 'rxjs/operators';
import * as _ from 'lodash';

const fetchMyPosts = pipe(
  switchMap(({ authorId }) => ajax(`https://rockship-adbe4.firebaseio.com/posts.json?orderBy="authorId"&equalTo="${authorId}"`).pipe(
    map(data => data.response),
    tap(console.log),
    map(res => {
      const myPosts = Object.keys(res).map(k => res[k]);

      if (myPosts.length === 0) {
        return {
          message: `No posts at the moment. Please add some.`
        }
      }

      return {
        myPosts,
        message: `Successfully fetched ${myPosts.length} posts from ${myPosts[0].author.displayName}`
      }
    }),
  )),
  startWith({ myPosts: [], message: 'Fetching...' })
)

const MyPosts = streamProps(fetchMyPosts);

const currentUsers = JSON.parse(localStorage.getItem('currentUser'));

export default () => (
  <MyPosts authorId={currentUsers.uid}>
    {({ myPosts, message }) => {
      return (
        <Fragment>
          <Col xs={12}>{message}</Col>
          <Col xs={12}>
            {myPosts.length > 0 ? (
              myPosts.map(p => (
                JSON.stringify(p)
              ))
            ) : null}
          </Col>
        </Fragment>
      )
    }}
  </MyPosts>
)
