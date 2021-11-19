var express = require("express");
const path = require('path');
//require('dotenv').config();
//const parseArgs = require('minimist');
// App de Express
const app = express();

const server = require('http').createServer(app);
io = require("socket.io").listen(server)
    // index = require("fs").readFileSync(__dirname + "/index.html", "utf8");


//const args = parseArgs(process.argv.slice(2));
//const { name = 'default', port = 9001 };

//app.use(express.bodyParser());

app.get("/", function(req, res, next) {
    //res.send(index);
    // io.socket.emit('ONINCREMENTAR', { contador: 1001 });
    res.send(`socket.io...on xxxxx `);
});

app.post("/foo", function(req, res, next) {
    // io.sockets.emit("foo", req.body);
    //
    res.send({});
});

app.listen(9001);