const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Degito test API',
            version: '1.0.0',
            description: 'API เว็บจองโรงแรม',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./server.js'],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi};