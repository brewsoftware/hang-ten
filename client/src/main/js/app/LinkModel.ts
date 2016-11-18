import * as _ from 'lodash';

export interface LinkModel {
  uid: string;
  href: string;
  content?: string;
  errorMessage?: string;
}

export const LINK_CONTENT:string = 'LinkModel.content';

export const LINK_ERROR:string = 'LinkModel.error';

export function linkContent(linkUid, content) {
  return {type: LINK_CONTENT, payload: {linkUid, content}}
}

export function linkError(linkUid, message:string) {
  return {type: LINK_ERROR, payload: {linkUid, message}};
}

export function fetchLinkContent(linkUid, href) {
  return async function(dispatch) {
    try {
      let res = await window.fetch(href),
          content = await res.text();
      dispatch(linkContent(linkUid, content));
    } catch(e) {
      dispatch(linkError(linkUid, e.message));
    }
  }
}

export function reduceLinkState(state, action):LinkModel {
  state = Object.assign({
    uid: _.uniqueId(),
    content: undefined,
    errorMessage: undefined
  }, state);

  if (action.payload && action.payload.linkUid == state.uid) {
    switch (action.type) {

      case LINK_CONTENT:
        state.content = action.payload.content;
        state.errorMessage = undefined;
        break;

      case LINK_ERROR:
        state.content = undefined;
        state.errorMessage = action.payload.message;
        break;
    }
  }

  return Object.freeze(state);
}
