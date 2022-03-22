const http = require('http');

const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req,res) => {
    console.log("resuest for "+req.url+" by method "+req.method);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html'); //the respond pody contains data in html format
    res.end('<html><body>Hello world!</body></html>'); //when it is finished
});

//start the server
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});