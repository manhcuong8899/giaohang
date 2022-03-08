module.exports = (app) => {
    const config_controller = require('../../controllers/admin/config');

    app.get('/admin/config/unit', config_controller.unit)
    app.post('/admin/config/unit', config_controller.post_unit)
    app.get('/admin/config/unit/view/:id', config_controller.view_unit)
    app.post('/admin/config/unit/view/:id', config_controller.updated_unit)
    app.post('/admin/config/unit/delete/:id', config_controller.delete_unit)

    app.get('/admin/config/banks', config_controller.banks)
    app.post('/admin/config/bank', config_controller.post_bank)
    app.get('/admin/config/bank/view/:id', config_controller.view_bank)
    app.post('/admin/config/bank/view/:id', config_controller.updated_bank)
    app.post('/admin/config/bank/delete/:id', config_controller.delete_bank)

    app.get('/admin/config/locale', config_controller.city)
    app.post('/admin/config/locale', config_controller.post_city)
    app.get('/admin/config/locale/view/:id', config_controller.view_locale)
    app.post('/admin/config/locale/view/:id', config_controller.updated_locale)
    app.post('/admin/config/locale/delete/:id', config_controller.delete_locale)

    app.get('/admin/config/locale/:code/district', config_controller.district)
    app.post('/admin/config/district/:code', config_controller.post_district)
    app.get('/admin/config/district/view/:id', config_controller.view_district)
    app.post('/admin/config/district/view/:id', config_controller.updated_district)
    app.post('/admin/config/district/delete/:id', config_controller.delete_district)

    app.get('/admin/config/district/:code/wards', config_controller.wards)
    app.post('/admin/config/wards/:code', config_controller.post_wards)
    app.get('/admin/config/wards/view/:id', config_controller.view_wards)
    app.post('/admin/config/wards/view/:id', config_controller.updated_wards)
    app.post('/admin/config/wards/delete/:id', config_controller.delete_wards)


    app.get('/admin/config/timedelivery', config_controller.timedelivery)
    app.post('/admin/config/timedelivery', config_controller.post_timedelivery)
    app.get('/admin/config/timedelivery/view/:id', config_controller.view_timedelivery)
    app.post('/admin/config/timedelivery/view/:id', config_controller.updated_timedelivery)
    app.post('/admin/config/timedelivery/delete/:id', config_controller.delete_timedelivery)

    app.get('/admin/config/branch', config_controller.branch)
    app.post('/admin/config/branch', config_controller.post_branch)
    app.get('/admin/config/branch/view/:id', config_controller.view_branch)
    app.post('/admin/config/branch/view/:id', config_controller.updated_branch)
    app.post('/admin/config/branch/delete/:id', config_controller.delete_branch)

    app.get('/admin/config/cost', config_controller.cost)
    app.post('/admin/config/cost', config_controller.update_cost)
    app.post('/admin/config/ajax/province', config_controller.ajax_province)
    app.post('/admin/config/ajax/district', config_controller.ajax_district)


};