module.exports = (app) => {
    const delivery_controller = require('../../controllers/shop/delivery');
    app.get('/shop/delivery/all', delivery_controller.all)
    app.get('/shop/delivery/created', delivery_controller.created)
    app.post('/shop/delivery/created', delivery_controller.post_created)
    app.post('/shop/delivery/feetransport', delivery_controller.feetransport)
    app.post('/shop/delivery/feeorders', delivery_controller.feeorders)
    app.get('/shop/delivery', delivery_controller.all)
    app.get('/shop/delivery/:code', delivery_controller.bystatus)
    app.get('/shop/delivery/detail/:code', delivery_controller.detail)
    app.post('/shop/delivery/seach', delivery_controller.seach)
};