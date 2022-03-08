module.exports = (app) => {
    const order_controller = require('../../controllers/admin/orders');
    app.get('/admin/orders', order_controller.all)
    app.get('/admin/orders/:code', order_controller.bystatus)
    app.post('/admin/orders/seach', order_controller.seach)
    app.post('/admin/orders/delete/:code', order_controller.delete)
    app.get('/admin/orders/detail/:code', order_controller.detail)
    app.post('/admin/orders/detail/:code', order_controller.updated)
};