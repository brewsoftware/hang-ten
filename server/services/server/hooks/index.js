
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-service-verify-reset').hooks;
const hooks = require('feathers-hooks');
exports.before = {
  all: [
    hooks.disable('external')
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
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
