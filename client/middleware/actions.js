export const ERROR = 'ERROR'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const INSERT_MESSAGE = 'INSERT_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const EDIT_MESSAGE = 'EDIT_MESSAGE'
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
export const COMPLETE_MESSAGE = 'COMPLETE_MESSAGE'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const SET_SYNC_STATE = 'SET_SYNC_STATE'

export function addMessage(text) {
  return { type: types.ADD_MESSAGE, text }
}

export function deleteMessage(id) {
  return { type: types.DELETE_MESSAGE, id }
}

export function editMessage(id, text) {
  return { type: types.EDIT_MESSAGE, id, text }
}

export function completeMessage(id) {
  return { type: types.COMPLETE_MESSAGE, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}
