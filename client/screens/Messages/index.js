import React, {PropTypes,Component} from 'react';
import AppNavBar from '../App/components/AppNavBar';
import {feathersServices} from '../../feathers';
import app from '../../feathers';
import {connect} from 'react-redux';
import {List,ListItem,makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {addMessage} from '../../middleware/actions';

import { MuiDataTable } from 'mui-data-table';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Parse} from 'parse';

const handleSubmit = () => new Promise((resolve) => resolve());
const mapStateToProps = (state) => {
    // TODO: Store reference or dispatch function?
    return {
        message: state.messages
    };
};
var dispatch; // TODO: Why isn't this coming through in the context???

const tableConfig = {
  paginated: true,
  search: 'text',
  columns: [
    { property: '_id', title: 'Id'},
    { property: 'text', title: 'Description' },
    { title: 'When', renderAs: function (data) {
      return `Run at ${data.timestamp}.`;
    }},
  ]
};

const mapDispatchToProps = (dispatchFunction) => {
    dispatch = dispatchFunction;
    return {};
}
var subscription;
var query;
class Messages extends Component {

    constructor(props) {
      super(props);
      this.state = {
        messages: []
      };
    }

    create(message){
      this.state.messages.push(message);
      console.log('Create' + message.get('title')); // This should output Mengyan
      this.state.messages = messages;
      setState(this.state);
    }

    remove(message){
      this.state.messages.pop();
      console.log('Create' + message.get('title')); // This should output Mengyan
      this.state.messages = messages;
      setState(this.state);

    }

    componentDidMount() {
      dispatch(addMessage('Component mounted'));

      query = new Parse.Query('Message');
      query.descending("score");
      query.limit(10);
      var self = this;
      // create,enter,update,leave,delete
      subscription.on('create', create);
      subscription.on('enter', create);
      subscription.on('leave', remove);

      subscription = query.subscribe();
    }

    componentWillUnmount() {
        subscription.unsubscribe();
    }

    render() {
        // tableConfig.data = this.props.message; // data taken from the props
        tableConfig.data = this.state.messages;
        return (
          <div>
            <AppNavBar label="Messages" screen="app/messages" />
            <h1> Recent Messages </h1>
            <div>
            <MuiThemeProvider>
              <MuiDataTable config={tableConfig} />
            </MuiThemeProvider>
            </div>
          </div>
        )
    }
  }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(Messages);
