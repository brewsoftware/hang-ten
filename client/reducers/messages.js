import { ADD_MESSAGE, INSERT_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE, UPDATE_MESSAGE, COMPLETE_MESSAGE, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/actions'

const initialState = []

export default function MESSAGES(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        {
          _id: id(),
          completed: false,
          text: action.text
        },
        ...state
      ]

    case INSERT_MESSAGE:
    {
       return [
        action.MESSAGE,
        ...state
      ]
    }
    case DELETE_MESSAGE:
      return state.filter(MESSAGE =>
        MESSAGE._id !== action.id
      )

    case EDIT_MESSAGE:
      return state.map(MESSAGE =>
        MESSAGE._id === action.id ?
          Object.assign({}, MESSAGE, { text: action.text }) :
          MESSAGE
      )

    case UPDATE_MESSAGE:
      return state.map(MESSAGE =>
        MESSAGE._id === action.MESSAGE._id ?
          action.MESSAGE :
          MESSAGE
      )

    case COMPLETE_MESSAGE:
      return state.map(MESSAGE =>
        MESSAGE._id === action.id ?
          Object.assign({}, MESSAGE, { completed: !MESSAGE.completed }) :
          MESSAGE
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(MESSAGE => MESSAGE.completed)
      return state.map(MESSAGE => Object.assign({}, MESSAGE, {
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(MESSAGE => MESSAGE.completed === false)

    default:
      return state
  }
}

function id() {
  return Math.random().toString(36).substring(7);
}
