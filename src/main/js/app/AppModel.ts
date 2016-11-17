import {reduceLinkState, LinkModel} from './LinkModel';

export interface AppModel {
  links: LinkModel[],
  functionDef: string
}

export const APP_ADD_LINK:string = 'AppModel.addLink';

export function appAddLink(href:string) {
  return {type: APP_ADD_LINK, payload: {href}};
}

export const SAVE_FUNCTION_DEFINITION:string = 'AppModel.saveFunctionDefinition';

export function saveFunctionDefinition(functionDef: string){
  return {type: SAVE_FUNCTION_DEFINITION, payload:{functionDef}};
}

export function reduceAppModel(state, action):AppModel {
  state = Object.assign({
    links: []
  }, state);

  switch (action.type) {

    case APP_ADD_LINK:
      state.links = state.links.concat({href: action.payload.href});
      break;
    case SAVE_FUNCTION_DEFINITION:
      state.functionDef = state.functionDef;
      break;
  }

  state.links = state.links.map(link => reduceLinkState(link, action));

  Object.freeze(state.links);
  return Object.freeze(state);
}
