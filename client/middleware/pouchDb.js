import PouchDB from 'pouchdb'
// import PouchSync from 'pouch-websocket-sync'
import * as types from '../constants/actions';
const moment = require('moment');
import PouchMiddleware from 'pouch-redux-middleware'
import PouchSync from 'pouch-websocket-sync'
const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
const clientEvents = ['connect', 'disconnect', 'reconnect'];

var db = new PouchDB('messages')

export function configSync(store){
  const syncClient = PouchSync.createClient();

  const sync = syncClient.
    connect('ws://localhost:3031').
    on('error', function(err) {
      console.log(err);
    }).
    sync(db, {
      remoteName: 'datapouchmessages',
      credentials: '1234xyz'
    });

  // Dispatch server events to the client.
  syncEvents.forEach(function(event) {
    sync.on(event, function() {
      store.dispatch({type: types.SET_SYNC_STATE, text: event});
    })
  });
  // Log client events back to the server
  clientEvents.forEach(function(event) {
    syncClient.on(event, function() {
      store.dispatch({type: types.SET_SYNC_STATE, text: event});
    })
  });

}
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
                MESSAGE: message
            }},
            update: message => {return {
                type: types.UPDATE_MESSAGE,
                MESSAGE: message
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
