module.exports = (app) => {
    const delivery_controller = require('../../controllers/admin/delivery');
    app.get('/admin/delivery', delivery_controller.all)
    app.get('/admin/delivery/:code', delivery_controller.bystatus)
    app.post('/admin/delivery/seach', delivery_controller.seach)
    app.post('/admin/delivery/delete/:code', delivery_controller.delete)
    app.post('/admin/delivery/cancel/:code', delivery_controller.cancel)
    app.post('/admin/delivery/confirm/:code', delivery_controller.confirm)
    app.get('/admin/delivery/detail/:code', delivery_controller.detail)
    app.post('/admin/delivery/detail/:code', delivery_controller.updated)
    app.get('/admin/delivery/addshipper/:code', delivery_controller.getaddshipper)
    app.post('/admin/delivery/addshipper/:code', delivery_controller.addshipper)
    app.get('/admin/delivery/addstatus/:code', delivery_controller.getaddstatus)
    app.post('/admin/delivery/addstatus/:code', delivery_controller.addstatus)
};