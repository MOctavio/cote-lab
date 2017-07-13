const cote = require('cote');
const Shipping = require('../models/shipping');

const shippingResponder = new cote.Responder({
    name: 'SHIPPING [Responder]',
    namespace: 'shipping',
    respondsTo: ['create']
});
const shippingPublisher = new cote.Publisher({
    name: 'SHIPPING [Publisher]',
    namespace: 'shipping',
    broadcasts: ['update']
});
const registerPublisher = new cote.Publisher({
    name: 'Register [Publisher]',
    key: 'register',
    broadcasts: ['register']
});
registerPublisher.publish('register', 'shipping');

shippingResponder.on('*', console.info);

shippingResponder.on('create', (req, cb) => {
    Shipping.create(req.order, cb);
    updateShipping();
});
shippingResponder.on('list', (req, cb) => {
    const query = req.query || {};
    Shipping.find(query, cb);
});
shippingResponder.on('get', (req, cb) => {
    Shipping.get(req.id, cb);
});
shippingResponder.on('delete', (req, cb) => {
    Shipping.get(req.id, (err, shipping) => {
        shipping.remove((err, shipping) => {
            cb(err, shipping);
            updateShipping();
        });
    });
});

function updateShipping() {
    Shipping.find((err, shippings) => {
        shippingPublisher.publish('update', shippings);
    });
}
