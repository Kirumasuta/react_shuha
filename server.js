"use strict"
const express = require('express');
const config = require('config');
const { MongoClient } = require('mongodb');
const app = express();

//Web-Sockets
const http = require('http');
const server = http.createServer(app);
const ws = require('ws');
const wss = new ws.Server({port: 8999});


wss.on('connection', function connection(ws){
    ws.on('message', function (message){
        message = JSON.parse(message);
        switch (message.event){
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

function broadcastMessage(message, id){
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}



const PORT = config.get('port') || 5000;


app.listen(PORT, ()=> console.log(`Server listen on ${PORT} port.`))