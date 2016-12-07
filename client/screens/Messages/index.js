import React, {PropTypes,Component} from 'react';
import AppNavBar from '../App/components/AppNavBar';
import {feathersServices} from '../../feathers';
import app from '../../feathers';
import {connect} from 'react-redux';
import {List,ListItem,makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {addMessage} from '../../middleware/actions';

const handleSubmit = () => new Promise((resolve) => resolve());
const mapStateToProps = (state) => {
    // TODO: Store reference or dispatch function?
    return {
        message: state.messages
    };
};
var dispatch;
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
        var items = <div></div>;
        if (this.props.message) {
            items = this.props.message.map( (data, key) => <ListItem value={key} key={key}
                primaryText = {data.text} />);
            }
            return (
              <div>
                <AppNavBar label="Messages" screen="app/messages" />
                <h1> Recent Messages </h1>
                <div>
                  {items}
                </div>
              </div>
            )
        }
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(Messages);
