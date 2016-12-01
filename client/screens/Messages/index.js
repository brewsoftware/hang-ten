import React, {PropTypes,Component} from 'react';
import AppNavBar from '../App/components/AppNavBar';
import {feathersServices} from '../../feathers';
import app from '../../feathers';
import {connect} from 'react-redux';
import {List,ListItem,makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

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
    dispatch(feathersServices.messages.find({
        query: {
            $sort: {
                time: -1
            }
        }
    }));
    return {};
}

class Messages extends Component {
    componentDidMount() {
        app.service("messages").on('created', data => {
            dispatch(feathersServices.messages.find({
                query: {
                    $sort: {
                        time: -1
                    }
                }
            }));
        });
    }

    componentWillUnmount() {
        app.service("messages").off('created', () => {});
    }

    render() {
        var items = < div > < /div>;
        if (this.props.message.queryResult) {
            items = this.props.message.queryResult.data.map( (data, key) => <ListItem value={key} key={key}
                primaryText = {data.time} />);
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
