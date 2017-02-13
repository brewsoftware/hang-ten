
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { config } from '../../../utils/config';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';
import Form from './Form';
import {Parse} from 'parse';


const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  Parse.User.logIn(values.email, values.password)
    .then((result) =>
    {
      dispatch(type:"LOGIN");
      dispatch({type:"LOGIN"});
      resolve();
    })
    .catch((err) =>
      {
        dispatch({
        type: 'LOGIN_ERROR',
        text: 'Login Failed'
        });
      reject();
    })});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLogout: () => {
    dispatch({
      type: 'LOGOUT',
      text: 'Successful Logout'
      });
  },
  handleRedirect: () => {
    dispatch(push(ownProps.redirectTo || config.client.defaultRoute));
  },
});

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'UserSignIn',
    isAuthenticated:false,
    // initialValues: { email: 'a@a.com' }, // set initialValues in mapStateToProps for dynamic data
    validate: usersClientValidations.signin,
    // asyncBlurFields: ['email', 'password'],
    // asyncValidate: (values, dispatch, props) => new Promise(...),
    onSubmit: handleSubmit,
  })(Form)
);
