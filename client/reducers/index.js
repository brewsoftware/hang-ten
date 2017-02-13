import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { feathersServices, feathersAuthentication } from '../feathers';
import messages from './messages';
import auth from './auth';
import user from './user'
export default {
  routing: routerReducer, // reducers required by react-router-redux
  auth: auth,
  users: user,
  verifyReset: feathersServices.verifyReset.reducer,
  form: reduxFormReducer, // reducers required by redux-form
  messages: messages
};
