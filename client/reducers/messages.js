import { MESSAGES_ADD, MESSAGES_REFRESH, MESSAGES_DELETE, MESSAGES_UPDATE} from '../constants/messages'
//, INSERT_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE, UPDATE_MESSAGE, COMPLETE_MESSAGE, COMPLETE_ALL, CLEAR_COMPLETED }

const initialState = []

export default function MESSAGES(state = initialState, action) {
    switch (action.type) {
    case 'MESSAGES_REFRESH':
    return action.data;
/*      return action.data.map(function(obj){
        let newobj = {};
        newobj.score = obj.get('score');
        newobj.text = obj.get('test');
        return newobj;
      });*/
    case MESSAGES_ADD:
      return [
        action.data,
        ...state
      ]
    case MESSAGES_DELETE:
      return state.filter(MESSAGE =>
        MESSAGE._id !== action.id
    )
    case MESSAGES_UPDATE:
      return state.map(MESSAGE =>
        MESSAGE._id === action.MESSAGE._id ?
          action.MESSAGE :
          MESSAGE
      )
    default:
      return state
  }
}

function id() {
  return Math.random().toString(36).substring(7);
}
