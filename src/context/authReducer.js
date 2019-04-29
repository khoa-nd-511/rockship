export const initialState = {
  isLoggedIn: false,
  currentUser: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, isLoggedIn: true, currentUser: action.currentUser }
    case 'LOG_OUT':
      return { ...state, isLoggedIn: false, currentUser: null }
    default:
      return state;
  }
}