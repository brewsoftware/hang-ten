import React, { PropTypes, Component } from 'react';
import AppNavBar from '../App/components/AppNavBar';
import { feathersServices } from '../../feathers';
import app from '../../feathers';
import { connect } from 'react-redux';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { addMessage } from '../../middleware/actions';

import { MuiDataTable } from 'mui-data-table';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Parse } from 'parse';

const handleSubmit = () => new Promise((resolve) => resolve());
const mapStateToProps = (state) =>
    // TODO: Store reference or dispatch function?
     ({
       message: state.messages
     });
let dispatch; // TODO: Why isn't this coming through in the context???

const tableConfig = {
  paginated: true,
  search: 'text',
  columns: [
    { property: '_id', title: 'Id' },
    { property: 'text', title: 'Description' },
    { title: 'When',
      renderAs(data) {
        return `Run at ${data.timestamp}.`;
      } },
  ]
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: (messages) => {
    dispatch({ type: 'MESSAGES_REFRESH', data: messages });
  },
  upsert: (message) => {
    dispatch({ type: 'MESSAGES_UPDATE', data: message });
  },
  add: (message) => {
    dispatch({ type: 'MESSAGES_ADD', data: message });
  },
  remove: (message) => {
    dispatch({ type: 'MESSAGES_DELETE', data: message });
  }
});

let subscription;
let query;
class Messages extends Component {

  componentDidMount() {
    query = new Parse.Query('Message');
    query.descending('score');
    query.limit(10);
    query.include('score');
    query.include('test');
    query.find().then((data) => {
      this.props.refresh(data);
    }).catch((err) => {
      console.log(err);
    });
    subscription = query.subscribe();

      // create,enter,update,leave,delete
    subscription.on('create', this.props.add);
    subscription.on('enter', this.props.add);
    subscription.on('update', this.props.upsert);
    subscription.on('leave', this.props.remove);
    subscription.on('delete', this.props.remove);
  }

  componentWillUnmount() {
    subscription.unsubscribe();
  }

  render() {
    const listItems = this.props.message.map((message) =>
      <li>{message.text}</li>
      );
    return (
      <div>
        <AppNavBar label="Messages" screen="app/messages" />
        <h1> Recent Messages </h1>
        <div>
          <hr />
          <ul>
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
  }

export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(Messages);
