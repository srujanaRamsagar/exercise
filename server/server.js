'use strict';

const Hapi = require('@hapi/hapi');

const festivals = require('./resources/festivals.json');


const getFestivalsHandler = (req, resp) => {
  console.log('GET /festivals');
  return resp(festivals);
  
};

const init = async () => {

    const server = Hapi.server({
        port: 8001,
        host: 'localhost',
        routes: {
          "cors": {
            "origin": ["*"],
            "headers" : ["Accept", "Content-Type"],
            "additionalHeaders" : ["X-Requested-With"]}
      }

    });

    server.route({
        method: 'GET',
        path:'/festivals',
        options : {
          cors:true,
        handler: (req, resp) => {

          return festivals ;
        }
      }

    });

  
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
