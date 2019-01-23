var http = require('http');
var fs = require('fs')
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./public/index.html', (err, fileContent) => {
        res.end(fileContent);
    })
});
server.listen();
