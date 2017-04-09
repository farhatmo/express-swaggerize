
'use strict';

var path = require('path'),
express = require('express'), 
swaggerDoc = require('swagger-jsdoc'), 
swaggerTools = require('swagger-tools');

function configureSwagger(opts) {
  var subpath = express();

  if(opts === undefined)
    opts = {};

  var swaggerDefinition = {
    info: { // API informations (required)
      title: 'Hello World', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'A sample API' // Description (optional)
    },
    host: 'localhost:3000', // Host (optional)
    basePath: '/api', // Base path (optional)
    securityDefinitions: {
      token: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  };

  var options = {
    // Import swaggerDefinitions
    swaggerDefinition: opts.swaggerDefinition || swaggerDefinition,
    // Path to the API docs
    apis: opts.apiPaths || []
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  var swaggerSpec = swaggerDoc(options);


  // Initialize the Swagger middleware
  swaggerTools.initializeMiddleware(swaggerSpec, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    subpath.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    subpath.use(middleware.swaggerValidator({
      validateResponse: true
    }));
    // Route validated requests to appropriate controller
    // app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    subpath.use(middleware.swaggerUi({ swaggerUiDir: __dirname + '/../public', swaggerUi: opts.swaggerUi || '' }));

  });


  subpath.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  return subpath;

}

module.exports = configureSwagger;
