module.exports = (app) => {
    const discount_controller = require('../../controllers/admin/discount');
    /* Router Discount*/
    app.get('/admin/discount/supply/:id', discount_controller.supply)
    app.post('/admin/discount/supply/:id', discount_controller.created_supply)

    app.get('/admin/discount/shop/:id', discount_controller.shop)
    app.post('/admin/discount/shop/:id', discount_controller.created_shop)

    app.post('/admin/discount/delete/:id', discount_controller.delete)
    app.get('/admin/discount/view/:id', discount_controller.view)
    app.post('/admin/discount/view/:id', discount_controller.updated)


};