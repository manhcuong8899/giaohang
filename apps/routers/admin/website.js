module.exports = (app) => {
    const website_controller = require('../../controllers/admin/website');
    app.get('/admin/website/settings', website_controller.settings)
    app.post('/admin/website/settings', website_controller.post_settings)

    app.get('/admin/category/:code', website_controller.category)
    app.post('/admin/category/:code', website_controller.created_category)
    app.get('/admin/category/view/:id', website_controller.view_category)
    app.post('/admin/category/view/:id', website_controller.updated_category)
    app.post('/admin/category/delete/:id', website_controller.delete_category)

    app.get('/admin/articles/:code', website_controller.articles)
    app.get('/admin/articles/created/:code', website_controller.created_articles)
    app.post('/admin/articles/created/:code',website_controller.post_articles)
    app.get('/admin/articles/view/:id', website_controller.view_articles)
    app.post('/admin/articles/view/:id', website_controller.updated_articles)
    app.post('/admin/articles/delete/:id', website_controller.delete_articles)
    app.post('/admin/articles/seach/:code', website_controller.seach_articles)

    app.get('/admin/images', website_controller.images)
    app.post('/admin/images', website_controller.created_images)
    app.get('/admin/images/view/:id', website_controller.view_images)
    app.post('/admin/images/view/:id', website_controller.updated_images)
    app.post('/admin/images/delete/:id', website_controller.delete_images)

};