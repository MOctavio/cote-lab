const cote = require('cote');
const User = require('../models/user');
const { Subscriber } = require('./subscriber');

const userResponder = new cote.Responder({
    name: 'USER [Responder]',
    namespace: 'user',
    respondsTo: ['create']
});
const userPublisher = new cote.Publisher({
    name: 'USER [Publisher]',
    namespace: 'user',
    broadcasts: ['update', 'register']
});

// Publish itself to be registered
Subscriber.publish('register', 'user');

// Responder
userResponder.on('*', console.info);

userResponder.on('create', (req, cb) => {
    User.create(req.user, cb);
    updateUsers();
});
userResponder.on('list', (req, cb) => {
    const query = req.query || {};
    User.find(query, cb);
});
userResponder.on('get', (req, cb) => {
    User.get(req.id, cb);
});
userResponder.on('delete', (req, cb) => {
    User.get(req.id, (err, user) => {
        user.remove((err, user) => {
            cb(err, user);
            updateUsers();
        });
    });
});

function updateUsers() {
    User.find((err, users) => {
        userPublisher.publish('update', users);
    });
}
