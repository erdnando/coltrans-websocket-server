const express = require('express');
const path = require('path');
require('dotenv').config();
const parseArgs = require('minimist');

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const args = parseArgs(process.argv.slice(2));
const { name = 'default', port = process.env.PORT } = args;



// Path público......
//const publicPath = path.resolve( __dirname, 'public' );
//app.use( express.static( publicPath ) );

app.get('/', (req, resp) => {
    resp.send(`socket.io...on : ${port}`);
});



//server.listen(process.env.PORT, (err) => {
server.listen(+port, '0.0.0.0', (err) => {

    if (err) throw new Error(err);

    //console.log('Servidor corriendo en puerto', process.env.PORT);
    console.log(`Node [${name}] listens on http://127.0.0.1:${port}.`);
});