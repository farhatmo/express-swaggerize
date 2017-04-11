# Express-Swaggerize
The project provides a middleware to integrate swagger-ui based on comments in the javascript code. The idea is to solve the common issues with connecting many package in order to get a automatically process for generating documentation from the comments in the source code.
It's used with the middleware express. Please visit the [issue tracker][project-issues] to see what issues we are aware of and what features/enhancements we are working on. 


## Supported Swagger Versions

* [1.2][swagger-docs-v1_2]
* [2.0][swagger-docs-v2_0]

<!--
## Installation Node.js

Installation for Node.js applications can be done via [NPM][npm].

```
npm install express-swaggerize --save
```-->

## Quick Start

**express-swaggerize** used with express and parse the sources files (for the specification ) in order de define a swagger api.
```javascript
var swaggerize = require('express-swaggerize');

var app = express()

  var options = {
    // Import swaggerDefinitions
    swaggerDefinition: {
      info: { // API informations (required)
        title: 'Swagger', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'A sample API made with <3' // Description (optional)
      },
      host: 'localhost:3000', // Host (optional)
      basePath: '/api', // Base path (optional)
      securityDefinitions: { // security definition (optional)
        token: {
          type: 'apiKey', 
          name: 'Authorization',
          in: 'header'
        }
      }
    },
    // Path to the API docs
    apiPaths: [path.resolve('./routes/*.routes.js'), path.resolve('./models/*.model.js')]
  };

  // Initialize express swagger object
  var swagger = swaggerize(options);

  // Affect the swagger express routes to '/v2/api'
  app.use('/v2/api', swagger);

```


## Contributing
We welcome pull requests from the community! Feel free to propose new features as PR in order to improve this package.



[project-issues]: https://github.com/farhatmo/express-swaggerize/issues
[swagger]: http://swagger.io/
[swagger-docs-v1_2]: https://github.com/swagger-api/swagger-spec/blob/master/versions/1.2.md
[swagger-docs-v2_0]: https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
[swagger-ui]: https://github.com/swagger-api/swagger-ui
