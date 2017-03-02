# hang-ten
Scheduling and Queueing service manager for NodeJS

## Running local development environment

Local environment variables are configured in the config directory. To configure an environment take that environment file and copy to local-*.js with the relative keys.

To run the local development servers use the following commands

 `npm run server:devserver`

This will start the server at http://localhost:3030/

Then run

  `npm run client:devclient`

  This will start the webpack process and serve the bundle.js from http://localhost:8080/

  To login and interact with the given application both need to be running, the main entry url in the above example would be http://localhost:3030/

  # Backend setup: TODO

  ## Background

  This project contains a docker-compose.yml file which details the environment configuration for a given app. The back end store (couchDB) will map it's data directory to the current directory that we are running in outside of the docker container.

  ## Requirements
   * Docker
   * Docker compose version 3 or above.

  ## Steps

  Run the docker instance with

  	`docker-compose up`

  Setup the default admin permissions using the default url

  http://localhost:8091/ui/index.html#/

  TODO: CouchDB default config file
