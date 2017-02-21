import { LOGIN, LOGOUT, LOGIN_ERROR } from '../constants/auth';

const initialState = { isAuthenticated: false, isSignedIn: false };

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      {
        var res =
          {
            isAuthenticated: true,
            isSignedIn: true
          };
        return res;
      }
    case LOGOUT:
      {
        var res =
          {
            isAuthenticated: false,
          };
        return res;
      }
    case LOGIN_ERROR:
      {
        var res =
          {
            isError: {
              message: action.text
            },
            isAuthenticated: false,
          };
        console.log(res);
        return res;
      }
    default:
      {
        return state;
      }
  }
}
