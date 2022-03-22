const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req,res) => {
    //console.log(req.headers);
    console.log("request for "+req.url+" by method "+req.method);

    if(req.method=='GET'){
        var fileURL;
        if(req.url=='/') fileURL='/index.html';
        else fileURL=req.url;

        var filePath=path.resolve('./public'+fileURL);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html'); //the respond pody contains data in html format
                    res.end('<html><body><h1>Error 404: '+fileURL+' NOT FOUND </h1></body></html>'); //when it is finished
                    return ;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(fileURL).pipe(res); //read and send the file out ... included  into the body of the  response
            })
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: '+fileURL+' not a HTML file </h1></body></html>'); //when it is finished
            return ;
        }

    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: '+fileURL+' not supported </h1></body></html>'); //when it is finished
        return ;
    }


});

//start the server
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});