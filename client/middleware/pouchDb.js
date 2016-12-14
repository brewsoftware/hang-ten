import PouchDB from 'pouchdb'
// import PouchSync from 'pouch-websocket-sync'
import * as types from '../constants/actions';
const moment = require('moment');
import PouchMiddleware from 'pouch-redux-middleware'

const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
const clientEvents = ['connect', 'disconnect', 'reconnect'];

var db = new PouchDB('messages');

const pouchMiddleware =  PouchMiddleware({
        path: '/messages',
        db,
        actions: {
            remove: message => {return {
                type: types.DELETE_MESSAGE,
                id: message._id
            }},
            insert: message => {return {
                type: types.INSERT_MESSAGE,
                message: message
            }},
            update: message => {return {
                type: types.UPDATE_MESSAGE,
                message: message
            }},
        }
    });



export default pouchMiddleware;

/*
    const createStoreWithMiddleware = applyMiddleware(pouchMiddleware)(createStore)
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers')
        store.replaceReducer(nextReducer)
      })
    }
  defult.exports = store;
*/
