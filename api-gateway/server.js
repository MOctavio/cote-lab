const app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    console.log(req.method, req.url);
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
app.get('/user', (req, res) => {
    userRequester.send({type: 'list'}, (err, users) => {
        res.send(users);
    });
});
// const productRequester = new cote.Requester({
//     name: 'admin product requester',
//     namespace: 'product'
// });
//
const userRequester = new cote.Requester({
    name: 'user requester',
    namespace: 'user'
});

new cote.Sockend(io, {
    name: 'sockend server'
});

// Server log & conf
const PORT = 3001;
server.listen(PORT);
console.info(`Server listening on port: ${PORT}`);