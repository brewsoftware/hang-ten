
const path = require('path');

const root = process.cwd();

module.exports = {
  logs: {
    logLevel: 'silly',
    path: path.join(root, 'logs-dev'),
    logConsoleLevel: 'silly',
  },
  database: {
    path: path.join(root, 'data-dev'),
  },
  server: {
    host: 'localhost',
    port: '3030',
  },
  auth: {
    token: {
      secret: 'xxxxxxxx',
    },
    local: {},
  },
  parseServer: {
    appId: 'xxxxxxxx',
    key: 'TBA',
    url: 'https://parse.buddy.com/apps',
    name: 'Tasker'
  },
  authEmails: {
    providers: {
      postmark: {
        fromEmail: '...@...com', // must be verified with postmarkapp.com
        postmarkApiToken: 'xxxxxx', // our account token
      },
    },
  },
};
