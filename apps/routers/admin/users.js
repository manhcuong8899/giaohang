module.exports = (app) => {
    const user_controller = require('../../controllers/admin/users');
    app.get('/admin/users/staff',user_controller.staff)
    app.post('/admin/users/staff/created', user_controller.staff_created)
    app.post('/admin/users/delete/:id', user_controller.delete)
    app.get('/admin/users/view/:id', user_controller.view)
    app.post('/admin/users/view/:id', user_controller.updated)
    app.post('/admin/users/staff/seach', user_controller.seach)
    /// Router phan tai khoan Shop
    app.get('/admin/users/shops',user_controller.shops)
    app.get('/admin/users/shops/view/:id', user_controller.shopsview)
    app.post('/admin/users/shops/view/:id', user_controller.updatedshops)
    app.post('/admin/users/shops/seach', user_controller.seachshop)
    /// Router phan tai khoan Supply
    app.get('/admin/users/supplies',user_controller.supplies)
    app.get('/admin/users/supplies/view/:id', user_controller.suppliesview)
    app.post('/admin/users/supplies/view/:id', user_controller.updatedsupplies)
    app.post('/admin/users/supplies/seach', user_controller.seachsupplies)
};