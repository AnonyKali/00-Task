const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'To-Do List API',
            version: '1.0.0',
            description: 'A simple Express To-Do List API'
        },
        servers: [
            {
                url: 'http://backend3server.serv00.net:4004'
            }
        ]
    },
    apis: ['./routes/*.js']
};

module.exports = options;
