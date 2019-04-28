import React, { Fragment } from 'react'
import Post from '../../components/Post/Post';
import { pipe } from 'rxjs';
import { ajax } from "rxjs/ajax"
import { map, startWith, switchMap } from "rxjs/operators"
import { streamProps } from 'react-streams';
import { Col } from 'react-bootstrap';

const fetchPosts = pipe(
  switchMap(_ => ajax('https://rockship-adbe4.firebaseio.com/posts.json').pipe(
    map(data => data.response),
    map(res => {
      if (!res || Object.keys(res) === 0) {
        return {
          posts: [],
          message: 'No posts at the moment'
        }
      }

      return {
        posts: res,
        message: `Successfully fetched ${Object.keys(res).length} posts!!!`
      }
    })
  )),
  startWith({ posts: [], message: 'Fetching...' })
)

const Dashboard = streamProps(fetchPosts);

export default () => {
  return (
    <Dashboard>
      {
        ({ posts, message }) => (
          <Fragment>
            <Col xs={12}><p>{message}</p></Col>
            {Object.keys(posts).length > 0 && (
              Object.keys(posts).map(k => (
                <Post key={k} post={posts[k]} />
              ))
            )}
          </Fragment>
        )
      }
    </Dashboard >
  )
}
