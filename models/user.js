const orm = require('orm');
const URL = require('../db/config');

const db = orm.connect(URL, function onConnect(err) {
    if (err) {
        console.error('Error', err);
        process.exit(1);
    }
});
db.settings.set('instance.cache', false);

module.exports = User = db.define('user', {
    name: String
});
