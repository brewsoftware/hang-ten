import * as types from '../constants/actions';

export function addMessage(text) {
  return { type: types.ADD_MESSAGE, text };
}

export function deleteMessage(id) {
  return { type: types.DELETE_MESSAGE, id };
}

export function editMessage(id, text) {
  return { type: types.EDIT_MESSAGE, id, text };
}

export function completeMessage(id) {
  return { type: types.COMPLETE_MESSAGE, id };
}

export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}
