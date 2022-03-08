module.exports = (app) => {
    const cart_controller = require('../../controllers/themes/cart');
    app.get('/addcart/:sid/:pid', cart_controller.addcart)
    app.get('/cart', cart_controller.viewcart)
    app.get('/checkout', cart_controller.checkout)
    app.post('/checkout', cart_controller.postcheckout)
    app.get('/deletecart/:id', cart_controller.deletecart)
    app.post('/updatecart', cart_controller.updatecart)
    app.get('/success', cart_controller.success)
};