# Khoa's test project for Rockship

### How to run on local

- **Step 1**: Clone or download to your machine
- **Step 2**: In the project directory, run `npm start`

### What I did for the projects

- **Authentication**: 
    - I enable and use Google authentication instead of the regular signing up with email and password because I have done that in another project of mine. Therefore, I this time want to try something new
    - And also, Google gives back a nice set of data so I can display them nicely.
- **State management**: 
    - State management in this project is not so big and complicated ( just wanting to see if user is logged in or not ) so I choose to use the new feature from React 16.8, which is Hooks instead of Redux.
    - This feature is really powerful, you can make almost or may the intire app to use only functional component with useContext, useReducer, useState, etc.
- **Asynchonous**: 
    - I use the Javascript's fetch to handle api calls.
    - However I also use the library called `react-streams` which is built on top of `rxjs`. Because I've recently learnt RxJS so I want to try it in this project. Check it out in `Show.js`, `Dashboard.js` or `MyPosts.js`.
    - What I have there is just some basics, `RxJS` and `react-streams` still have a lot more cooler stuff. Will definitely learn them more in the future :)
- **Form and WYSIWGY**: 
    - Normally I create forms from scratch, but in this project I use `Formik` as a form handler and `react-quill` for the body of the post as the required.
- **Router**: 
    - I use `react-router-dom` for handling routes.
    - `react-router-dom` has the nice `NavLink` which will give me some properties when they are active and stuff.
- **Other**:
    - `Bootstrap` for UI
    - `SweetAlert` for confirmation before delete Post
    - `lodash` for working with object
    - `react-firebaseui` for the nice Log in with Google` button

### **What I want to do more for this project**:
- Form validation
- I didn't render a spinner or disable the button (again I've done this in my other projects) when create a post or edit a post or delete a post, user will click multiple times which will make multiple api calls. What I want to do to prevent this in this project is using RxJS with the `exhaustMap` operator. However I did not success doing that :(
- Better UI and animations (maybe)
 
### **Deployment**
###### I deploy the project with `Firebase`
###### Check it out at [Rockship](https://rockship-adbe4.firebaseapp.com/)

