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

class Messages extends Component {
    componentDidMount() {
      dispatch(addMessage('Component mounted'));
    }

    componentWillUnmount() {

    }

    render() {
        tableConfig.data  = this.props.message; // data taken from the props
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
