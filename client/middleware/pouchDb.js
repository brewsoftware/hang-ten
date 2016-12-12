import PouchDB from 'pouchdb'
import PouchSync from 'pouch-websocket-sync'
import * as types from '../constants/actions';

import PouchMiddleware from 'pouch-redux-middleware'

const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
const clientEvents = ['connect', 'disconnect', 'reconnect'];

var db = new PouchDB('messages');

const syncClient = PouchSync.createClient();

const sync = syncClient.connect('ws://localhost:3031').sync(db, {
    remoteName: "data/pouch-messages",
    credentials: { token: 'some token'}
}).on('error', function(err) {
       console.error(err);
    });
var theStore;
  syncEvents.forEach(function(event) {
      sync.on(event, function() {
          theStore.dispatch({
              type: types.SET_SYNC_STATE,
              text: event
          });
      })
  });

  clientEvents.forEach(function(event) {
      syncClient.on(event, function() {
          theStore.dispatch({
              type: types.SET_SYNC_STATE,
              text: event
          });
      })
  });


const pouchMiddleware = store => next => action => {

theStore = store;
    return PouchMiddleware({
        path: '/messages',
        db,
        actions: {
            remove: message => store.dispatch({
                type: types.DELETE_MESSAGE,
                id: message._id
            }),
            insert: message => store.dispatch({
                type: types.INSERT_MESSAGE,
                message: message
            }),
            update: message => store.dispatch({
                type: types.UPDATE_MESSAGE,
                message: message
            }),
        }
    });
}


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
