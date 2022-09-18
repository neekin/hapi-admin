const { createServer } = require('hapi-admin')
const Database = require('./config/database');
const init = async () => {
    const server = await createServer()
    Database.connect();
    await server.start();
    console.log('Listening on %s', server.info.uri);

}

init();