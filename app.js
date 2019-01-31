const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');

const hostname = "localhost";
const port = 3000;

var serve = serveStatic('public')

var server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res))
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});