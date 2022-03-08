module.exports = (app) => {
    const product_controller = require('../../controllers/themes/products');
    app.get('/san-pham/:slug', product_controller.detailproducts)
    app.get('/san-pham/:code/:slug', product_controller.listproducts)


};