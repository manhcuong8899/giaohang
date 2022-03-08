const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const helpers = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
const configDB = require('../../models/ConfigDB');
const categoryDB = require('../../models/Category');
const articlesDB = require('../../models/Articles');
const imagesDB = require('../../models/Images');
const slug = require('slug');
const multer =require('multer');
const makeDir = require('make-dir');
module.exports = {
    settings:  function(req, res) {
        authlogin.authlogin(req, res);
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('website/settings',{
                layout: 'main',
                title: 'Cấu hình các thông tin của Website',
                csrfToken: req.csrfToken(),
                data:{settings},
                user:req.session['user'],
            });
        }, 100);
    },

    post_settings:  function(req, res) {
        const data = req.body;
        var obj = JSON.parse(JSON.stringify(data))
        Object.keys(obj).forEach(function(code){
            if(code!='_csrf'){
                var val = obj[code];
                configDB.updated(code,val).then((result) =>{
                    res.redirect('back');
                }).catch((err) => {
                    res.redirect('back');
                });
            }
        });
        setTimeout(() => {
            res.status(200).render('website/settings',{
                layout: 'main',
                title: 'Cấu hình các thông tin của Website',
                csrfToken: req.csrfToken(),
                data:{}
            });
        }, 100);
    },
    category:  function(req, res) {
        const code = req.params.code;
        authlogin.authlogin(req, res);
        let categories;
        categoryDB.all(code).then((result) => { categories = result;}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('website/category',{
                layout: 'website',
                title: 'Quản lý danh mục',
                csrfToken: req.csrfToken(),
                data:{categories,code},
                user:req.session['user'],
            });
        }, 100);
    },
    created_category: function(req, res){
        const code = req.params.code;
        const request = req.body;
        data ={
            code: request.code,
            name: request.name,
            keywords: request.keywords,
            description: request.description,
            slug:slug(request.name),
            orders:request.orders,
            type:code,
        }
        categoryDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_category:  function(req, res){
        const id = req.params.id;
        const request = req.body;
        data ={
            code: request.code,
            name: request.name,
            keywords: request.keywords,
            description: request.description,
            slug:slug(request.name),
            orders:request.orders
        }
        categoryDB.updated(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_category:  function(req, res){
        var cateid = req.params.id;
        categoryDB.deletecategory(cateid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_category:  function(req, res){
        var id = req.params.id;
        categoryDB.view(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    //// Quan ly bai viet
    articles:  function(req, res) {
        const code = req.params.code;
        authlogin.authlogin(req, res);
        let articles,cates;
        const  nametype = helpers.getNametypeArticles(code);

        articlesDB.all(code).then((result) => { articles = result;}
        ).catch((err) => warning = err);

        categoryDB.all(code).then((result) => { cates = result;}
        ).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('website/articles/all',{
                layout: 'articles',
                title: "Quản lý bài viết " + nametype,
                csrfToken: req.csrfToken(),
                data:{articles,cates,code,nametype},
                user:req.session['user'],
            });
        }, 100);
    },

    created_articles:  function(req, res) {
        authlogin.authlogin(req, res);
        const code = req.params.code;
        let cates;
        const  nametype = helpers.getNametypeArticles(code);
        categoryDB.all(code).then((result) => { cates = result;}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('website/articles/created',{
                layout: 'articles',
                title: "Tạo bài viết " + nametype,
                csrfToken: req.csrfToken(),
                data:{cates,code,nametype},
                user:req.session['user'],
            });
        }, 100);
    },
    post_articles: function(req, res){
        const code = req.params.code;
        let path = 'public/upload/articles/';
        let uploadFile = helpers.uploadimages(path,'images');
        uploadFile(req, res, (error) => {
            const request = req.body;
            let nameimages = helpers.getnameimages(slug(request.name),req.file.mimetype);
            if (error) {
                return res.send(`Error when trying to upload: ${error}`);
            }
            data ={
                name: request.name,
                slug:slug(request.name),
                images:nameimages,
                keywords: request.keywords,
                description: request.description,
                orders:request.orders,
                short:request.short,
                content:request.content,
                type:code,
                cate_id:request.cate_id,
            }
            articlesDB.created(data).then((result) =>{
            }).catch((err) => {
                res.redirect('back');
            });
            res.redirect('/admin/articles/'+code);
        });
    },
   view_articles:  function(req, res) {
        authlogin.authlogin(req, res);
        const id = req.params.id;
       let aArticles;
       let code;
       let cates,acates;
       articlesDB.byid(id).then((result) => {
           aArticles = result;
           code = result.type;
               const  nametype = helpers.getNametypeArticles(code);
               categoryDB.cates(code,aArticles.cate_id).then((result) => { cates = result;}
               ).catch((err) => warning = err);
               categoryDB.view(aArticles.cate_id).then((result) => { acates = result;}
               ).catch((err) => warning = err);
               setTimeout(() => {
                   res.status(200).render('website/articles/updated',{
                       layout: 'articles',
                       title: "Tạo bài viết " + nametype,
                       csrfToken: req.csrfToken(),
                       data:{aArticles,cates,acates,code,nametype},
                       user:req.session['user'],
                   });
               }, 100);
       }
       ).catch((err) => warning = err);


    },
    updated_articles: function(req, res){
        const id = req.params.id;
        let aArticles;
        articlesDB.view(id).then((kq)=>{aArticles = kq;
                let path = 'public/upload/articles/';
                let uploadFile = helpers.uploadimages(path,'images');
                uploadFile(req, res, (error) => {
                    if (error) {
                        return res.send(`Error when trying to upload: ${error}`);
                    }
                    const request = req.body;
                    if(!req.file){
                        data ={
                            name: request.name,
                            slug:slug(request.name),
                            images:aArticles.images,
                            keywords: request.keywords,
                            description: request.description,
                            orders:request.orders,
                            short:request.short,
                            content:request.content,
                            cate_id:request.cate_id,
                        }
                        articlesDB.updated(data,id).then((result) =>{
                            //// Đổi tên thư mục chứa Ảnh
                            let oldpath = './public/upload/articles/'+aArticles.slug;
                            let newpath = './public/upload/articles/'+slug(request.name);
                            helpers.renamefolder(oldpath,newpath);
                            res.redirect('back');
                        }).catch((err) => {
                            res.redirect('back');
                        });
                    }else{
                        var n = slug(request.name).localeCompare(aArticles.slug);
                        if(n!=0){
                            let oldpath = './public/upload/articles/'+aArticles.slug;
                            helpers.deleteDirectory(oldpath);
                        }
                        let nameimages = helpers.getnameimages(slug(request.name),req.file.mimetype);
                        data ={
                            name: request.name,
                            slug:slug(request.name),
                            images:nameimages,
                            keywords: request.keywords,
                            description: request.description,
                            orders:request.orders,
                            short:request.short,
                            content:request.content,
                            cate_id:request.cate_id,
                        }
                        articlesDB.updated(data,id).then((result) =>{
                            res.redirect('back');
                        }).catch((err) => {
                            res.redirect('back');
                        });
                    };
                });


        }).catch((err) => {
            console.log(err);
        });
    },
    delete_articles:  function(req, res){
        var articlesid = req.params.id;
        let aArticles;
        articlesDB.view(articlesid).then((result) =>{
            aArticles = result;
            let oldpath = './public/images/articles/'+aArticles.slug;
            helpers.deleteDirectory(oldpath);
            articlesDB.deletearticles(articlesid).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });
        }).catch((err) => {
            res.redirect('back');
        });
    },
    seach_articles: function(req, res){
        authlogin.authstaff(req, res);
        var code = req.params.code;
        const data = req.body;
        let articles,cates;
        const  nametype = helpers.getNametypeArticles(code);

        articlesDB.seacharticles(data,code).then((result) => { articles = result;}
        ).catch((err) => warning = err);
        categoryDB.all(code).then((result) => { cates = result;}
        ).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('website/articles/all',{
                layout: 'articles',
                title: "Quản lý bài viết " + nametype,
                csrfToken: req.csrfToken(),
                data:{articles,cates,code,nametype},
                user:req.session['user'],
            });
        }, 100);
    },

    ///////// Quan ly hinh anh

    images:  function(req, res) {
        const code = req.params.code;
        authlogin.authlogin(req, res);
        let images;
        imagesDB.all().then((result) => { images = result;}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('website/images',{
                layout: 'images',
                title: 'Quản lý hình ảnh',
                csrfToken: req.csrfToken(),
                data:{images},
                user:req.session['user'],
            });
        }, 100);
    },
    created_images: function(req, res){
        let path = 'public/upload/images/';
        let uploadFile = helpers.uploadimages(path,'images');
        uploadFile(req, res, (error) => {
            const request = req.body;
            let nameimages = helpers.getnameimages(slug(request.name),req.file.mimetype);
            if (error) {
                return res.send(`Error when trying to upload: ${error}`);
            }
            data ={
                name: request.name,
                slug:slug(request.name),
                images:nameimages,
                link:request.link,
                short: request.short,
                type: request.type,
                orders:request.orders,
            }
            imagesDB.created(data).then((result) =>{
            }).catch((err) => {
                res.redirect('back');
            });
            res.redirect('/admin/images');
        });
    },
    view_images:  function(req, res){
        var id = req.params.id;
        imagesDB.view(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_images: function(req, res){
        const id = req.params.id;
        let aImages;
        imagesDB.view(id).then((kq)=>{aImages = kq;
            let path = 'public/upload/images/';
            let uploadFile = helpers.uploadimages(path,'images');
            uploadFile(req, res, (error) => {
                if (error) {
                    return res.send(`Error when trying to upload: ${error}`);
                }
                const request = req.body;
                if(!req.file){
                    data ={
                        name: request.name,
                        slug:slug(request.name),
                        images:aImages.images,
                        link:request.link,
                        short: request.short,
                        type: request.type,
                        orders:request.orders,
                    }
                    imagesDB.updated(data,id).then((result) =>{
                        //// Đổi tên thư mục chứa Ảnh
                        let oldpath = './public/upload/images/'+slug(aImages.name);
                        let newpath = './public/upload/images/'+slug(request.name);
                        helpers.renamefolder(oldpath,newpath);
                        res.redirect('back');
                    }).catch((err) => {
                        res.redirect('back');
                    });
                }else{
                    var n = slug(request.name).localeCompare(slug(aImages.name));
                    if(n!=0){
                        let oldpath = './public/upload/images/'+slug(aImages.name);
                        helpers.deleteDirectory(oldpath);
                    }
                    let nameimages = helpers.getnameimages(slug(request.name),req.file.mimetype);
                    data ={
                        name: request.name,
                        slug:slug(request.name),
                        images:nameimages,
                        link:request.link,
                        short: request.short,
                        type: request.type,
                        orders:request.orders,
                    }
                    imagesDB.updated(data,id).then((result) =>{
                        res.redirect('back');
                    }).catch((err) => {
                        res.redirect('back');
                    });
                };
            });


        }).catch((err) => {
            console.log(err);
        });
    },
    delete_images:  function(req, res){
        var imgid = req.params.id;
        let aImages;
        imagesDB.view(imgid).then((result) =>{
            aImages = result;
            let oldpath = './public/upload/images/'+slug(aImages.name);
            helpers.deleteDirectory(oldpath);
            imagesDB.deleteimages(imgid).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });
        }).catch((err) => {
            res.redirect('back');
        });
    },
};