import {reduceAppModel, appAddLink, APP_ADD_LINK} from '../../../main/js/app/AppModel';

describe('reduceAppModel(state, action)', () => {

  it(`creates empty AppModel by default`, () => {
    let appState = reduceAppModel({}, {});
    expect(appState).toEqual(Object.freeze({links: Object.freeze([])}));
  });

  it(`can process ${APP_ADD_LINK} action`, () => {
    let appState = reduceAppModel({}, appAddLink('foo:href'));
    expect(appState).toEqual(Object.freeze({
      links: Object.freeze([
        Object.freeze({
          uid: '1',
          href: 'foo:href',
          content: undefined,
          errorMessage: undefined
        })
      ])
    }));
  });
});
