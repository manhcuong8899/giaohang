module.exports = (app) => {
    const product_controller = require('../../controllers/admin/products');
    app.get('/admin/products/all', product_controller.all)
    app.get('/admin/products/created', product_controller.created)
    app.post('/admin/products/created', product_controller.post_products)
    app.get('/admin/products/view/:id', product_controller.view)
    app.post('/admin/products/updated/:id', product_controller.updated)
    app.post('/admin/products/delete/:id', product_controller.delete)
    app.post('/admin/products/deleteimages', product_controller.deleteimages)
    app.get('/admin/products/check', product_controller.check)
    app.post('/admin/products/seach', product_controller.seachproducts)
    app.post('/admin/products/ajax/getcate', product_controller.getcate)
    app.get('/admin/products/selling', product_controller.selling)

    app.get('/admin/products/selling/supply/:id', product_controller.selling_supply)
    app.post('/admin/products/selling/supply/:id', product_controller.post_selling)
    app.get('/admin/products/selling/view/:supplyid/:id', product_controller.selling_view)
    app.post('/admin/products/selling/view/:supplyid/:id', product_controller.selling_updated)
    app.post('/admin/products/selling/delete/:supplyid/:id', product_controller.selling_delete)
};