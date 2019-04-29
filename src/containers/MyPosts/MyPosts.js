import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Col } from 'react-bootstrap';
import { pipe } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { streamProps } from 'react-streams';
import { startWith, map, switchMap, } from 'rxjs/operators';

const fetchMyPosts = pipe(
  switchMap(({ authorId }) => ajax(`https://rockship-adbe4.firebaseio.com/posts.json?orderBy="authorId"&equalTo="${authorId}"`).pipe(
    map(data => data.response),
    map(res => {
      const myPosts = Object.keys(res).map(k => ({ ...res[k], postId: k }));

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
console.log(currentUsers)

export default () => (
  <MyPosts authorId={currentUsers.uid}>

    {({ myPosts, message }) => {
      return (
        <Fragment>
          <Col xs={12}>{message}</Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.length > 0 ? (
                myPosts.map(p => (
                  <tr key={p.postId}>
                    <td>{myPosts.indexOf(p) + 1}</td>
                    <td>
                      <Link to={`/show?id=${p.postId}`}>{p.title}</Link>
                    </td>
                    <td>{p.createdAt}</td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </Table>
        </Fragment>
      )
    }}

  </MyPosts>
)
