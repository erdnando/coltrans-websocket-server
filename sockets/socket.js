const { io } = require('../index.js');

//var contador = 0;
//var socketx = {};
// Mensajes de Sockets
io.on('connection', socket => {
    var contador = 0;
    console.log('Nuevo socket conectado');
    // exports.socketx = socket;

    socket.on('login', (payload) => {
        //1 publish into backend topics aka kaftka or rabbitmq

        //2 subscribe for backend topic response

        //3 on response emit event to frontend
        var autenticado = false;
        var mensaje = "";

        if (payload.email == "xxx") {
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
        //1 publish into backend topics aka kaftka or rabbitmq

        //2 subscribe for backend topic response

        //3 on response emit event to frontend

        contador++;
        console.log('incrementar', contador);
        //3.1.1 envia a todos
        //io.emit('ONINCREMENTAR', { contador: contador });
        //3.1.2 o envia solo al cte conectado
        socket.emit('ONINCREMENTAR', { contador: contador });

    });

    socket.on('decrementar', (payload) => {
        //1 publish into backend topics aka kaftka or rabbitmq

        //2 subscribe for backend topic response

        //3 on response emit event to frontend

        contador--;
        console.log('decrementar', contador);
        //3.1.1 envia a todos
        //io.emit('ONDECREMENTAR', { contador: contador });
        //3.1.2 o envia solo al cte conectado
        socket.emit('ONDECREMENTAR', { contador: contador });

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

});