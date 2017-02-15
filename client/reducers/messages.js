
import { MESSAGES_ADD, MESSAGES_REFRESH, MESSAGES_DELETE, MESSAGES_UPDATE} from '../constants/messages'
//, INSERT_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE, UPDATE_MESSAGE, COMPLETE_MESSAGE, COMPLETE_ALL, CLEAR_COMPLETED }

const initialState = []
function convertObject(obj){
  let newobj = {};
  newobj.score = obj.get('score');
  newobj.text = obj.get('test');
  newobj.id = obj.id;
  return newobj;
}
export default function MESSAGES(state = initialState, action) {
    switch (action.type) {
    case 'MESSAGES_REFRESH':
      var data=  action.data.map(function(obj){
        return convertObject(obj);
      });
      return data;
    case MESSAGES_ADD:
      var newObj = convertObject(obj);
      return [
        newObj,
        ...state
      ]
    case MESSAGES_DELETE:
      return state.filter(MESSAGE =>
        MESSAGE.id !== action.data.id
    )
    case MESSAGES_UPDATE:
      return state.map(MESSAGE =>
        MESSAGE.id === action.data.id ? convertObject(action.data) : MESSAGE
      )
    default:
      return state
  }
}

function id() {
  return Math.random().toString(36).substring(7);
}
