// Load polyfills first.
//require('babel-polyfill');
//require('whatwg-fetch');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';

import {App} from './app/App';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {default as thunk} from 'redux-thunk';
import {reduceAppModel} from './app/AppModel';

//import 'babel-polyfill';
const io = require( 'socket.io-client/socket.io');
const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client')

require('../less/index.less');

let config:any = require('./config.json');

const DEFAULT_APP_STATE = {
  links: [
    {href: config.href}
  ]
};

let appStore = applyMiddleware(thunk)(createStore)(reduceAppModel, DEFAULT_APP_STATE);

// Prevent application from being re-rendered too often with throttle.
let renderApp = _.throttle(() => {
  ReactDOM.render(
    <App dispatch={appStore.dispatch}
         model={appStore.getState()}/>,
    document.getElementById('app'));
}, 50);

// Initial render.
renderApp();

// Schedule application re-render on every action.
appStore.subscribe(() => setTimeout(renderApp, 0));

const socket = io('http://localhost:3030');
var client = feathers()
//    .configure(ft.hooks())
    .configure(socketio(socket));

var jobsService = client.service('jobs');

jobsService.on('created', function(message) {
    console.log('job created', message);
  });

client.emit('jobs::create', {
  "text": "I really have to iron"
}, (error, message) => {
  console.log('Todo created', message);
});
