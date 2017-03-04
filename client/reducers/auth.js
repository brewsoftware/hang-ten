import { LOGIN, LOGOUT, LOGIN_ERROR } from '../constants/auth';

const initialState = { isAuthenticated: false, isSignedIn: false };

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      {
        let res =
          {
            isAuthenticated: true,
            isSignedIn: true
          };
          return res;
      }
    case LOGOUT:
      {
        let res =
          {
            isAuthenticated: false
          };
          return res;
      }
    case LOGIN_ERROR:
      {
        let res =
          {
            isError: {
              message: action.text
            },
            isAuthenticated: false
          };
          return res;
      }
    default:
      {
        return state;
      }
  }
}
