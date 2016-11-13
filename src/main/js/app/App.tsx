import * as React from 'react';
import {AppModel, appAddLink} from './AppModel';
import {Link} from './Link';

interface AppProps {
  dispatch: Function;
  model: AppModel;
  errorMessage?: string;
}

export class App extends React.Component<AppProps, any> {
  state = {
    userHref: 'http://www.google.com/'
  };

  onAddLinkClick = e => {
    let {userHref} = this.state;
    if (userHref) {
      this.props.dispatch(appAddLink(userHref));
    }
  };
  
  onInputChange = e => {
    this.setState({userHref: e.target.value})
  };
  
  render() {
    let {dispatch, model: {links}} = this.props;
    return (
      <div>
        <ul className="link-list">
          {links.map((link, i) =>
            <li key={i}>
              <Link dispatch={dispatch}
                    model={link}/>
            </li>
          )}
        </ul>
        <input type="text"
               value={this.state.userHref}
               onChange={this.onInputChange}/>
        <button onClick={this.onAddLinkClick}>Add link</button>
      </div>
    );
  }
}
