const app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    console.info(req.method, req.url);
    next();
});
app.get('/print', (req, res) => {
    // productRequester.send({type: 'list'}, (err, products) => {
    //     res.send(products);
    // });
});
app.post('/print', (req, res) => {
    // productRequester.send({type: 'create', product: req.body.product}, (err, product) => {
    //     res.send(product);
    // });
});
app.delete('/print/:id', (req, res) => {
    // productRequester.send({type: 'delete', id: req.params.id}, (err, product) => {
    //     res.send(product);
    // });
});
app.get('/shiping', (req, res) => {
    // productRequester.send({type: 'list'}, (err, products) => {
    //     res.send(products);
    // });
});
app.post('/shiping', (req, res) => {
    // productRequester.send({type: 'create', product: req.body.product}, (err, product) => {
    //     res.send(product);
    // });
});
app.delete('/shiping/:id', (req, res) => {
    // productRequester.send({type: 'delete', id: req.params.id}, (err, product) => {
    //     res.send(product);
    // });
});

// User API's
app.get('/user', (req, res) => {
    userRequester.send({type: 'list'}, (err, users) => {
        res.send(users);
    });
});
app.patch('/user', (req, res) => {
    userRequester.send({type: 'create', user: req.body.user}, (err, user) => {
        res.send(user);
    });
});
app.delete('/user', (req, res) => {
    userRequester.send({type: 'delete', id: req.body.id}, (err, user) => {
        res.send(user);
    });
});

// const productRequester = new cote.Requester({
//     name: 'admin product requester',
//     namespace: 'product'
// });
//
const userRequester = new cote.Requester({
    name: 'USER [Requester]',
    namespace: 'user'
});

new cote.Sockend(io, {
    name: 'Sockend [WebSocket]'
});

// Server log & conf
const PORT = 3001;
server.listen(PORT);
console.info(`Server listening on port: ${PORT}\n`);
