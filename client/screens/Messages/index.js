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

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh:(messages) => {
    dispatch({type: 'MESSAGES_REFRESH', data:messages});
  },
  upsert: (message) => {
    dispatch({type: 'MESSAGES_UPDATE', data:message})
  },
  remove: (message) => {
    dispatche({type:'MESSAGES_DELETE', data:message})
  }
});

var subscription;
var query;
class Messages extends Component {

    componentDidMount() {
      query = new Parse.Query('Message');
      query.descending("score");
      query.limit(10);
      query.include("score");
      query.include("test");
      query.find().then((data) => {
        this.props.refresh(data);
      }).catch((err) =>
      {
        console.log(err);
      });
      subscription = query.subscribe();

      // create,enter,update,leave,delete
      subscription.on('create', this.props.upsert);
      subscription.on('enter', this.props.upsert);
      subscription.on('update', this.props.upsert);
      subscription.on('leave', this.props.remove);
      subscription.on('delete', this.props.remove);

    }

    componentWillUnmount() {
        subscription.unsubscribe();
    }

    render() {
      const config = {
        paginated: true,
        search: 'text',
        data: this.props.message,
        columns: [
          { property: 'text', title: 'Text'},
          { property: 'score', title: 'Score' }
        ]
      };
        return (
          <div>
            <AppNavBar label="Messages" screen="app/messages" />
            <h1> Recent Messages </h1>
            <div>
            <MuiThemeProvider>
              <MuiDataTable config={config} />
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
