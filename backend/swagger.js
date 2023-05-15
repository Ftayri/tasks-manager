const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

const doc = {
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    host: 'localhost:3000',
    basePath: '/api', // Set the base path here
  };

swaggerAutogen(outputFile, endpointsFiles, doc);