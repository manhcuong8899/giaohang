module.exports = (app) => {
    const customers_controller = require('../../controllers/admin/customers');
    app.get('/admin/customers/all', customers_controller.all)
    app.post('/admin/customers/created', customers_controller.created)
    app.get('/admin/customers/view/:id', customers_controller.view)
    app.post('/admin/customers/view/:id', customers_controller.updated)
    app.post('/admin/customers/seach', customers_controller.seach)
    app.post('/admin/customers/delete/:id', customers_controller.delete)

};