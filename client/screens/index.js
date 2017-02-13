
import React, { PropTypes, Component } from 'react';
import {Parse} from 'parse';

import { connect } from 'react-redux';
class AppWrapper extends Component {

  componentWillMount(){
    // check parse user, if logged in then redirect to app page
    var currentUser = Parse.User.current();
    if (currentUser) {
      console.log('current: ' + currentUser.id);

      var query = new Parse.Query('User');
      query.equalTo("objectId", currentUser.id);
      query.get().then((data) => {
        console.log('get worked');
        console.log(data);
      })
      let subscription = query.subscribe();
      subscription.on('update', (object) => {
        console.log('object updated');
        this.props.handleLogin(object);
      });
      this.props.handleLogin(Parse.User.current());
        // do stuff with the user
    } else {
      console.log('not current');
      this.props.handleLogout();
        // show the signup or login page
    }
  }
  componentWillUnmount(){
    // unsubscribe from parse updates
    if(this.query){
      this.query.unsubscribe();
    }
  }
  componentWillReceiveProps(nextProps) {

//    if (!this.props.isAuthenticated && nextProps.isAuthenticated) { // true after successful submit
//      this.props.handleRedirect();
//    }
  }

  render() {
    return (<div>
      {this.props.children}
    </div>);

  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLogout: () => {
    dispatch({
      type: 'LOGOUT',
      text: 'Successful Logout'
      });
  },
  handleLogin: (user) => {
    dispatch({
      type:'LOGIN',
      user: user
    })
  }
});


AppWrapper.propTypes = {
  children: PropTypes.any,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapper);
