
import React, { PropTypes, Component } from 'react';
import AppNavBar from '../App/components/AppNavBar';
import feathers from '../../feathers';
import { connect } from 'react-redux';

const handleSubmit = () => new Promise((resolve) => resolve());
const mapStateToProps = (state) => {
  // TODO: Store reference or dispatch function?
  return  {message:state.messages};
};
const mapDispatchToProps = (dispatch) => {
  // TODO: Better store reference
  const messageService = app.service('messages');

  messageService.find({ query: {} }, (errors, messages) => console.log('messages list', messages));

}
class Messages extends Component {


  componentDidMount() {
//    store.dispatch(feathersServices.config.get())
//      .then(res => {
    const messageService = app.service('messages');
    // TODO: Implement paging around each message.
    // TODO: DIspatch a set event and a created.
    messageService.on('created', message => console.log('Someone created a message', message));

  }

  componentWillUnmount(){
    const messageService = app.service('messages');
    messageService.off('created');
  }
  render() {
    return(
      <div>
        <AppNavBar label="App" screen="app/main" />
        <h1>The App 2</h1>
        <div>
        {JSON.stringify(this.props.message)}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
