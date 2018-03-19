const express   = require('express')
const http      = require('http')
const socketio  = require('socket.io')

class Server {
    constructor(port = 18080, app = express()) {
        this.port   = port
        this.app    = app
        //this.app.use('/js', express.static(__dirname + '/../js'))
        //this.app.use('/js', express.static(__dirname + '/../bower_components'))
        this.app.use('/js/jquery.js', express.static(__dirname + '/../bower_components/jquery/dist/jquery.js'))
        this.app.use('/js/react.js', express.static(__dirname + '/../bower_components/react/react.production.min.js'))
        this.app.use('/js/react-dom.js', express.static(__dirname + '/../bower_components/react/react-dom.production.min.js'))


        
        //this.app.set('view engine', 'ejs')
        this.app.listen();
        this.server = http.createServer(this.app)
        //this.io     = socketio(http)
        
        //this.server.listen(this.port);

        this.io     = socketio.listen(this.server)
    }

    boot() {
        let port = this.port, app = this.app, server = this.server, io = this.io;

        // GET method
        app.get('/', (req, res) => {
            res.render('index');
        });

        io.sockets.on('connection', (socket) => {

            socket.on('initialConnected', (data) => {
                // 
                io.sockets.emit('publish', {value: 'Iinitial connected'});
                
            });

            socket.on('connected', (data) => {
                io.sockets.emit("publish", {value: 'publish from connected'});
            });
            socket.on('disconnect', () => {
                console.log('disconnect');
                io.sockets.emit('publish', {value: 'disconnect'});
            });

            socket.on('publish', (data) => {
                io.sockets.emit("publish", {value:data.value});
            });


        });

        server.listen(port, () => {
            console.log("Listening on port " + port);
        })
    }
}

module.exports = Server;

