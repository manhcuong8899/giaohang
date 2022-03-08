module.exports = (app) => {
    const orders_controller = require('../../controllers/supply/orders');

    app.get('/supply/orders/all', orders_controller.all)
};