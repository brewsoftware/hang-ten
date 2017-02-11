
import React, { PropTypes, Component } from 'react';

class AppWrapper extends Component {
  componentWillMount(){
    // check parse user, if logged in then redirect to app page

  }
  componentWillUnmount(){
    // unsubscribe from parse updates

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

AppWrapper.propTypes = {
  children: PropTypes.any,
};

export default AppWrapper;
