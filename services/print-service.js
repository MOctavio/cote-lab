const cote = require('cote');
const Print = require('../models/print');

const printResponder = new cote.Responder({
    name: 'PRINT [Responder]',
    namespace: 'print',
    respondsTo: ['create']
});
const printPublisher = new cote.Publisher({
    name: 'PRINT [Publisher]',
    namespace: 'print',
    broadcasts: ['update']
});

printResponder.on('*', console.info);

printResponder.on('create', (req, cb) => {
    Print.create(req.order, cb);
    updatePrint();
});
printResponder.on('list', (req, cb) => {
    const query = req.query || {};
    Print.find(query, cb);
});
printResponder.on('get', (req, cb) => {
    Print.get(req.id, cb);
});
printResponder.on('delete', (req, cb) => {
    Print.get(req.id, (err, print) => {
        print.remove((err, print) => {
            cb(err, print);
            updatePrint();
        });
    });
});

function updatePrint() {
    Print.find((err, prints) => {
        printPublisher.publish('update', prints);
    });
}
