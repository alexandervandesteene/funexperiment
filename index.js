var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io').listen(http);

http.listen(3000);


io.sockets.on('connection', function(socket){
    console.log("we hebben connectie");
    socket.on('vraag', function(data){
        console.log(data.vraag);
        io.emit("ontvangenVraag",data);
    });

    socket.on('antwoord',function(data){
        console.log("gevonden data");
        console.log(data[0]);
        console.log(data[1]);
        console.log(data);
    });

});

app.use(express.static(__dirname+'/public'));

app.get('/client',function(req,res){
    res.sendFile('public/client.html', {root: __dirname });
});