const var_dump = require('var_dump');
const helpers = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
const categoryDB = require('../../models/Category');
const configDB = require('../../models/ConfigDB');
const produdtDB = require('../../models/ProductsDB');
const sellingDB = require('../../models/SellingDB');
const slug = require('slug');
const multer =require('multer');
const makeDir = require('make-dir');
const fs = require('fs');
module.exports = {
    all:  function(req, res) {
        let products, cates;
        authlogin.authsupply(req, res);
        produdtDB.supply_all(req.session['user'].supply_id).then((result) => { products = result;}
        ).catch((err) => warning = err);
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);
        setTimeout(() =>{
            res.status(200).render('supply/products/all',{
                layout: 'supply/products',
                title: "Quản lý hàng hóa",
                csrfToken: req.csrfToken(),
                data:{products,cates},
                user:req.session['user'],
            });
        }, 100);
    },
    created:  function(req, res) {
        authlogin.authsupply(req, res);
        let cates,units;
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);
        configDB.units().then((kq) => { units = kq;}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supply/products/created',{
                layout: 'supply/products',
                title: "Tạo mới sản phẩm ",
                csrfToken: req.csrfToken(),
                data:{cates,units},
                user:req.session['user'],
            });
        }, 100);
    },
    post_products: function(req, res){
        let path = 'public/upload/products/';
        let uploadFile = helpers.uploadMultipleimages(path);
        uploadFile(req, res, (error) => {
            const request = req.body;
            const files = req.files;
            let nameimages = helpers.getnameimages(slug(request.name),files['images'][0].mimetype);
            data ={
                name: request.name,
                slug:slug(request.name),
                images:nameimages,
                keywords: request.keywords,
                description: request.description,
                short:request.short,
                content:request.content,
                branch:request.branch,
                cate_id:request.cate_id,
                unit_id:request.unit_id,
                status:0,
                supply_id:req.session['user'].supply_id,
            }
            produdtDB.created(data).then((result) =>{
            }).catch((err) => {
                res.redirect('back');
            });
            res.redirect('/supply/products/all');
        });
    },
    view: async function(req, res) {
        authlogin.authsupply(req, res);
        const id = req.params.id;
        let aPro;
        var viewimages = [];
        let cates,acates,units,aunit;
        await produdtDB.supply_byid(id,req.session['user'].supply_id).then((result) => {
                aPro = result;
                categoryDB.cates('products',aPro.cate_id).then((result) => { cates = result;}
                ).catch((err) => warning = err);
                categoryDB.view(aPro.cate_id).then((result) => { acates = result;}
                ).catch((err) => warning = err);
                configDB.units().then((kq) => { units = kq;}
                ).catch((err) => warning = err);
                configDB.view_unit(aPro.unit_id).then((kq) => { aunit = kq;}
                ).catch((err) => warning = err);
                const directory = 'public/upload/products/'+aPro.slug + '/views';
                fs.readdir(directory, (err, files) => {
                    var i=0;
                    files.forEach(function (file, index, array){
                        viewimages[index]={
                            slug:aPro.slug,
                            file:file
                        }
                    });
                });
                setTimeout(() => {
                    res.status(200).render('supply/products/updated',{
                        layout: 'supply/products',
                        title: "Thông tin chi tiết sản phẩm",
                        csrfToken: req.csrfToken(),
                        data:{aPro,cates,acates,units,aunit,viewimages},
                        user:req.session['user'],
                    });
                }, 100);
            }
        ).catch((err) => warning = err);


    },
    updated: function(req, res){
        const id = req.params.id;
        let aPro;
        produdtDB.view(id).then((kq)=>{aPro = kq;
            let path = 'public/upload/products/';
            let uploadFile = helpers.uploadMultipleimages(path);
            uploadFile(req, res, (error) => {
                if (error) {
                    return res.send(`Error when trying to upload: ${error}`);
                }
                const request = req.body;
                var filesexits = helpers.isEmpty(req.files);
                if(filesexits == true){
                    data ={
                        name: request.name,
                        slug:slug(request.name),
                        images:aPro.images,
                        keywords: request.keywords,
                        description: request.description,
                        short:request.short,
                        content:request.content,
                        branch:request.branch,
                        cate_id:request.cate_id,
                        unit_id:request.unit_id,
                    }
                    produdtDB.updated(data,id).then((result) =>{
                        //// Đổi tên thư mục chứa Ảnh
                        let oldpath = './public/upload/products/'+aPro.slug;
                        let newpath = './public/upload/products/'+slug(request.name);
                        helpers.renamefolder(oldpath,newpath);
                        res.redirect('back');
                    }).catch((err) => {
                        res.redirect('back');
                    });
                }else{
                    var n = slug(request.name).localeCompare(aPro.slug);
                    if(n!=0){
                        let oldpath = './public/upload/products/'+aPro.slug;
                        helpers.deleteDirectory(oldpath);
                    }
                    let nameimages = aPro.images;
                    if(req.files['images']){
                        nameimages = helpers.getnameimages(slug(request.name),req.files['images'][0].mimetype);
                    }
                    data ={
                        name: request.name,
                        slug:slug(request.name),
                        images:nameimages,
                        keywords: request.keywords,
                        description: request.description,
                        short:request.short,
                        content:request.content,
                        branch:request.branch,
                        cate_id:request.cate_id,
                        unit_id:request.unit_id,
                    }
                    produdtDB.supply_updated(data,id,req.session['user'].supply_id).then((result) =>{
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
    delete:  async function(req, res){
        authlogin.authsupply(req, res);
        var proid = req.params.id;
        let aPro;
        await produdtDB.view(proid).then((result) =>{
            aPro = result;
            let oldpath = './public/upload/products/'+aPro.slug;
            helpers.deleteDirectory(oldpath);
            produdtDB.supply_deleteproducts(proid,req.session['user'].supply_id).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });
        }).catch((err) => {
            res.redirect('back');
        });
    },
    deleteimages:  function(req, res){
        data = req.body;
        let url = data.url;
        let oldpath = './public/'+url;
        helpers.deleteDirectory(oldpath);
        res.send(data);
    },
    seachproducts: function(req, res){
        authlogin.authsupply(req, res);
        const data = req.body;
        let products, cates;
        produdtDB.supply_seachproducts(data,req.session['user'].supply_id).then((result) => { products = result;}
        ).catch((err) => warning = err);
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);
        setTimeout(() =>{
            res.status(200).render('supply/products/all',{
                layout: 'supply/products',
                title: "Quản lý hàng hóa",
                csrfToken: req.csrfToken(),
                data:{products,cates},
                user:req.session['user'],
            });
        }, 100);
    },
    selling:  function(req, res) {
        let products, cates,listproducts;
        authlogin.authsupply(req, res);
        sellingDB.bysupply(req.session['user'].supply_id).then((result) => { products = result;}
        ).catch((err) => warning = err);
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);

        sellingDB.products().then((result) => { listproducts = result;}
        ).catch((err) => warning = err);

        setTimeout(() =>{
            res.status(200).render('supply/products/selling',{
                layout: 'supply/products',
                title: "Quản lý hàng hóa",
                csrfToken: req.csrfToken(),
                data:{products,cates,listproducts},
                user:req.session['user'],
            });
        }, 100);
    },
    selling_created:  function(req, res) {
        authlogin.authsupply(req, res);
        let products;
        sellingDB.products().then((result) => { products = result;}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supply/products/selling_created',{
                layout: 'supply/products',
                title: "Đăng bán sản phẩm ",
                csrfToken: req.csrfToken(),
                data:{products},
                user:req.session['user'],
            });
        }, 100);
    },
    post_selling: function(req, res){
        authlogin.authsupply(req, res);
            const request = req.body;
            data ={
                p_id:request.p_id,
                name: request.name,
                price:request.price,
                address:request.address,
                phone: request.phone,
                amount: request.amount,
                supply_id:req.session['user'].supply_id,
            }
        sellingDB.created(data).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });

    },
    selling_view:  function(req, res){
        var sid = req.params.id;
        sellingDB.view(sid,req.session['user'].supply_id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    selling_updated: function(req, res){
        const id = req.params.id;
        const request = req.body;
        data ={
            p_id:request.p_id,
            name: request.name,
            price:request.price,
            address:request.address,
            phone: request.phone,
            amount: request.amount
        }
        sellingDB.updated(data,id,req.session['user'].supply_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });

    },
    selling_delete:  async function(req, res){
        authlogin.authsupply(req, res);
        var sid = req.params.id;
        let aPro;
        sellingDB.deleteselling(sid,req.session['user'].supply_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
};