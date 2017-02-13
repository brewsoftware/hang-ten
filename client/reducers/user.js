import { LOGIN, LOGOUT, LOGIN_ERROR } from '../constants/auth'
import { USER_UPDATE } from '../constants/user'


const initialState = {user: undefined};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    {
      var res =
         {
           user: action.user,
         }
         return res;

    }
    default:
    {
      return state
    }
  }
}
