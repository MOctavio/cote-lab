const cote = require('cote');

exports.Subscriber = new cote.Publisher({
    name: 'Register [Publisher]',
    key: 'register',
    broadcasts: ['register']
});
