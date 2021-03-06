const { io } = require('../index.js');
// Access the callback-based API  
var amqp = require('amqplib/callback_api');
const { v4: uuidv4 } = require('uuid');

//var contador = 0;
//var socketx = {};
// Mensajes de Sockets
io.on('connection', socket => {
    var contador = 0;
    var connid = uuidv4();
    console.log('Nuevo socket conectado');
    // exports.socketx = socket;

    socket.on('login', (payload) => {
        //1 publish into backend topics aka kaftka or rabbitmq

        //2 subscribe for backend topic response

        //3 on response emit event to frontend
        var autenticado = false;
        var mensaje = "";

        if (payload.email == "erdnando@gmail.com" || payload.email == "hernan660@hotmail") {
            autenticado = true;
            mensaje = "Usuario valido";
        } else {
            autenticado = false;
            mensaje = "Usuario no valido";
        }

        //3.1.1 envia a todos
        //io.emit('ONINCREMENTAR', { contador: contador });
        //3.1.2 o envia solo al cte conectado
        socket.emit('ONLOGIN', { autenticado: autenticado, email: payload.email, msg: mensaje });

    });

    socket.on('incrementar', (payload) => {

        console.log('on click incrementa');
        console.log('ip updated.......... a 192.168.0.6');

        //1 publish into backend topics aka kaftka or rabbitmq
        amqp.connect('amqp://rabbit:password@192.168.0.6:5672/', function(error0, connection) {
            if (error0) {
                throw error0;
            }

            connection.createChannel(function(error1, channel) {
                if (error1) { throw error1; }

                var q_target = 'q_ms_contador';
                var q_origin = 'q_origin' + payload.uuid; // connid; 

                channel.assertQueue(q_target, { durable: false, exclusive: false, autoDelete: false });
                channel.assertQueue(q_origin, { durable: false, exclusive: false, autoDelete: true });

                var payloadMsg = {
                    valor: payload.counter,
                    accion: "add",
                    q_origin: q_origin
                };

                console.log('payloadMsg:');
                console.log(JSON.stringify(payloadMsg));
                //---------------------EMIT REQUEST----------------------------------------------------------------------
                channel.sendToQueue(q_target, Buffer.from(JSON.stringify(payloadMsg)));


                //2 subscribe for backend topic response
                //---------------------CONSUME RESPONSE------------------------------------------------------------------
                channel.consume(q_origin, function(msg) {
                    console.log(" [x] Received %s", JSON.parse(msg.content).valor.toString());

                    //3 on response emit event to session frontend
                    //(optional) if you want send to all sessions use io.emit('ONINCREMENTAR', { contador: contador });
                    socket.emit('ONINCREMENTAR', { contador: JSON.parse(msg.content).valor.toString() });
                    console.log(" [x] Received %s", JSON.parse(msg.content).valor.toString());
                    connection.close();
                }, {
                    noAck: true
                });

            });

        });

    });

    socket.on('decrementar', (payload) => {
        //1 publish into backend topics aka kaftka or rabbitmq

        //2 subscribe for backend topic response

        //3 on response emit event to frontend

        /*contador--;
        console.log('decrementar', contador);
        //3.1.1 envia a todos
        //io.emit('ONDECREMENTAR', { contador: contador });
        //3.1.2 o envia solo al cte conectado
        socket.emit('ONDECREMENTAR', { contador: contador });*/
        console.log('on click decrementa');

        //1 publish into backend topics aka kaftka or rabbitmq
        amqp.connect('amqp://rabbit:password@192.168.0.6:5672/', function(error0, connection) {
            if (error0) { throw error0; }

            connection.createChannel(function(error1, channel) {
                if (error1) { throw error1; }

                var q_target = 'q_ms_contador';
                var q_origin = 'q_origin' + payload.uuid; // connid; 

                channel.assertQueue(q_target, { durable: false, exclusive: false, autoDelete: false });
                channel.assertQueue(q_origin, { durable: false, exclusive: false, autoDelete: true });

                var payloadMsg = {
                    valor: payload.counter,
                    accion: "subs",
                    q_origin: q_origin
                };

                console.log('payloadMsg:');
                console.log(JSON.stringify(payloadMsg));
                //---------------------EMIT REQUEST----------------------------------------------------------------------
                channel.sendToQueue(q_target, Buffer.from(JSON.stringify(payloadMsg)));


                //2 subscribe for backend topic response
                //---------------------CONSUME RESPONSE------------------------------------------------------------------
                channel.consume(q_origin, function(msg) {
                    console.log(" [x] Received %s", JSON.parse(msg.content).valor.toString());

                    //3 on response emit event to session frontend
                    //(optional) if you want send to all sessions use io.emit('ONINCREMENTAR', { contador: contador });
                    socket.emit('ONDECREMENTAR', { contador: JSON.parse(msg.content).valor.toString() });
                    console.log(" [x] Received %s", JSON.parse(msg.content).valor.toString());
                    connection.close();

                }, {
                    noAck: true
                });

            });

        });






    });

    socket.on('getContador', (payload) => {
        //1 publish into backend topics aka kaftka or rabbitmq

        //2 subscribe for backend topic response

        //3 on response emit event to frontend

        console.log('getContador', contador);
        //3.1.1 envia a todos
        //io.emit('ONGETCONTADOR', { contador: contador });
        //3.1.2 o envia solo al cte conectado
        io.emit('ONGETCONTADOR', { contador: contador });

    });


    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });


    setTimeout(function() {
        try {
            if (global.gc) { global.gc(); }
        } catch (e) {
            console.log("`node --expose-gc index.js`");
            //process.exit();
        }

    }, 30000);

    /*
    Then, after a client requests to join a room, 
    the WebSocket will capture and broadcast events from one client to all other clients in the same room.

        // Register "join" events, requested by a connected client
        socket.on("join", function(room) {
            // join channel provided by client
            socket.join(room)
                // Register "image" events, sent by the client
            socket.on("image", function(msg) {
                // Broadcast the "image" event to all other clients in the room
                socket.broadcast.to(room).emit("image", msg);
            });
        })*/

    //Subscribe to queues - receive
    /* amqp.connect('amqps://uqxskusb:dsHbnkqnQjuIHAp_O9dlmwK_CI5jXybM@woodpecker.rmq.cloudamqp.com/uqxskusb', function(error0, connection) {
         if (error0) { throw error0; }
         connection.createChannel(function(error1, channel) {
             if (error1) { throw error1; }

             var queue = 'queue_contador';

             channel.assertQueue(queue, { durable: false });

             console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

             channel.consume(queue, function(msg) {
                 socket.emit('ONINCREMENTAR', { contador: msg.content.toString() });
                 console.log(" [x] Received %s", msg.content.toString());


             }, {
                 noAck: true
             });
         });

     });*/











});