module.exports = (app) => {
    const pricelist_controller = require('../../controllers/admin/pricelist');
    app.get('/admin/pricelist/transportfee/shop/:id', pricelist_controller.transportfee)
    app.post('/admin/pricelist/transportfee/shop/:id', pricelist_controller.created)
    app.post('/admin/pricelist/delete/:id', pricelist_controller.delete)
    app.get('/admin/pricelist/view/:id', pricelist_controller.view)
    app.post('/admin/pricelist/view/:id', pricelist_controller.updated)

    app.get('/admin/pricelist/codfee/shop/:id', pricelist_controller.codfee)
    app.post('/admin/pricelist/codfee/shop/:id', pricelist_controller.created_cod)

    app.get('/admin/pricelist/orderfee/shop/:id', pricelist_controller.orderfee)
    app.post('/admin/pricelist/orderfee/shop/:id', pricelist_controller.created_order)

    app.get('/admin/pricelist/vieworderfee/:id', pricelist_controller.view)
    app.post('/admin/pricelist/vieworderfee/:id', pricelist_controller.updated_orderfee)

};