module.exports = (app) => {
    const product_controller = require('../../controllers/supply/products');
    app.get('/supply/products/all', product_controller.all)
    app.get('/supply/products/created', product_controller.created)
    app.post('/supply/products/created', product_controller.post_products)
    app.get('/supply/products/view/:id', product_controller.view)
    app.post('/supply/products/updated/:id', product_controller.updated)
    app.post('/supply/products/delete/:id', product_controller.delete)
    app.post('/supply/products/deleteimages', product_controller.deleteimages)
    app.post('/supply/products/seach', product_controller.seachproducts)

    app.get('/supply/products/selling', product_controller.selling)
    app.get('/supply/products/selling/created', product_controller.selling_created)
    app.post('/supply/products/selling/created', product_controller.post_selling)
    app.get('/supply/products/selling/view/:id', product_controller.selling_view)
    app.post('/supply/products/selling/view/:id', product_controller.selling_updated)
    app.post('/supply/products/selling/delete/:id', product_controller.selling_delete)

};