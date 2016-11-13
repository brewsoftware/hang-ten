import * as React from 'react';
import {fetchLinkContent, LinkModel} from './LinkModel';

interface LinkProps {
  dispatch: Function;
  model: LinkModel;
}

export class Link extends React.Component<LinkProps, {}> {

  onLinkClick = () => {
    let {dispatch, model: {uid, href}} = this.props;
    dispatch(fetchLinkContent(uid, href));
  };

  render() {
    let {model: {href, content, errorMessage}} = this.props;
    let contentBlock;
    if (content) {
      contentBlock = <div>Page content: <pre>{content}</pre></div>
    }
    if (errorMessage) {
      contentBlock = <div>Error occurred: <pre>{errorMessage}</pre></div>;
    }
    return (
      <span>
        <a className="link red"
           href="javascript:"
           onClick={this.onLinkClick}>
          Click to fetch content from {href}
        </a>
        {contentBlock}
      </span>
    );
  }
}
