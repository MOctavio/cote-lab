const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote'),
    path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    console.info(req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

// Services API
app.get('/services', (req, res) => {
    res.send(services);
});

// Print API's
app.get('/print', (req, res) => {
    printRequester.send({
        type: 'list'
    }, (err, prints) => {
        res.send(prints);
    });
});
app.patch('/print', (req, res) => {
    printRequester.send({
        type: 'create',
        order: req.body
    }, (err, print) => {
        res.send(print);
    });
});
app.delete('/print', (req, res) => {
    printRequester.send({
        type: 'delete',
        id: req.body.id
    }, (err, print) => {
        res.send(print);
    });
});

// Shipping API's
app.get('/shipping', (req, res) => {
    shippingRequester.send({
        type: 'list'
    }, (err, shippings) => {
        res.send(shippings);
    });
});
app.patch('/shipping', (req, res) => {
    shippingRequester.send({
        type: 'create',
        order: req.body
    }, (err, shipping) => {
        res.send(shipping);
    });
});
app.delete('/shipping', (req, res) => {
    console.log(req.body);
    shippingRequester.send({
        type: 'delete',
        id: req.body.id
    }, (err, shipping) => {
        res.send(shipping);
    });
});

// User API's
app.get('/user', (req, res) => {
    userRequester.send({
        type: 'list'
    }, (err, users) => {
        res.send(users);
    });
});
app.patch('/user', (req, res) => {
    userRequester.send({
        type: 'create',
        user: req.body.user
    }, (err, user) => {
        res.send(user);
    });
});
app.delete('/user', (req, res) => {
    userRequester.send({
        type: 'delete',
        id: req.body.id
    }, (err, user) => {
        res.send(user);
    });
});

// Requesters
const userRequester = new cote.Requester({name: 'USER [Requester]', namespace: 'user'});
const printRequester = new cote.Requester({name: 'PRINT [Requester]', namespace: 'print'});
const shippingRequester = new cote.Requester({name: 'SHIPPING [Requester]', namespace: 'shipping'});

// Register subscriber
const registerSubscriber = new cote.Subscriber({name: 'Register [Subscriber]', key: 'register', subscribesTo: ['register']});
const services = [];
registerSubscriber.on('register', (msg) => {
    services.push(msg);
});

// Web Sockets
new cote.Sockend(io, {name: 'Sockend [WebSocket]'});

// Server log & conf
const PORT = 3001;
server.listen(PORT);
console.info(`Server listening on port: ${PORT}\n`);
