const MongoClient = require('mongodb').MongoClient;
const URL = require('./config');

MongoClient.connect(URL, (err, db) => {
    if (err) throw err;
    console.info("Database created!");
    // db.createCollection("users", (err, res) => {
    //     if (err) throw err;
    //     console.info("Table created!");
    //     db.close();
    // });
});
