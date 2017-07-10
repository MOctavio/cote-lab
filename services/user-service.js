const cote = require('cote');
const User = require('../models/user');

const userResponder = new cote.Responder({
    name: 'user responder',
    namespace: 'user',
    respondsTo: ['create']
});
const userPublisher = new cote.Publisher({
    name: 'user publisher',
    namespace: 'user',
    broadcasts: ['update']
});

userResponder.on('*', console.log);

userResponder.on('create', (req, cb) => {
    User.create({}, cb);
    updateUsers();
});
userResponder.on('list', (req, cb) => {
    const query = req.query || {};
    User.find(query, cb);
});
userResponder.on('get', (req, cb) => {
    User.get(req.id, cb);
});

function updateUsers() {
    User.find((err, users) => {
        userPublisher.publish('update', users);
    });
}
