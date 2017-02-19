
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-service-verify-reset').hooks;
const hooks = require('feathers-hooks');
exports.before = {
  all: [
  ],
  find: [

  ],
  get: [

  ],
  create: [
    auth.restrictToAuthenticated(),
    verifyHooks.restrictToVerified(),
  ],
  update: [
    auth.restrictToAuthenticated(),
    verifyHooks.restrictToVerified(),
  ],
  patch: [
    auth.restrictToAuthenticated(),
    verifyHooks.restrictToVerified(),
  ],
  remove: [
    auth.restrictToAuthenticated(),
    verifyHooks.restrictToVerified(),
  ],
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};
