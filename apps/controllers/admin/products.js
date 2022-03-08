const var_dump = require('var_dump');
const helpers = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
const categoryDB = require('../../models/Category');
const configDB = require('../../models/ConfigDB');
const produdtDB = require('../../models/ProductsDB');
const supplyDB = require('../../models/SuppliesDB');
const sellingDB = require('../../models/SellingDB');
const slug = require('slug');
const multer =require('multer');
const makeDir = require('make-dir');
const fs = require('fs');
module.exports = {
    all:  function(req, res) {
        let products, cates;
        authlogin.authstaff(req, res);
        produdtDB.all().then((result) => { products = result;}
        ).catch((err) => warning = err);
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);
        setTimeout(() =>{
            res.status(200).render('products/all',{
                layout: 'products',
                title: "Quản lý hàng hóa",
                csrfToken: req.csrfToken(),
                data:{products,cates},
                user:req.session['user'],
            });
        }, 100);
    },
    created:  function(req, res) {
        authlogin.authstaff(req, res);
        let cates,units;
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);
        configDB.units().then((kq) => { units = kq;}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('products/created',{
                layout: 'products',
                title: "Tạo mới hàng hóa ",
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
                status:1,
            }
            produdtDB.created(data).then((result) =>{
            }).catch((err) => {
                res.redirect('back');
            });
            res.redirect('/admin/products/all');
        });
    },
    view:  function(req, res) {
        authlogin.authstaff(req, res);
        const id = req.params.id;
        let aPro;
        var viewimages = [];
        let cates,acates,units,aunit;
        produdtDB.byid(id).then((result) => {
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
                if (helpers.isEmpty(files)== false){
                    var i=0;
                    files.forEach(function (file, index, array){
                        viewimages[index]={
                            slug:aPro.slug,
                            file:file
                        }
                    });
                }
            });
                setTimeout(() => {
                    res.status(200).render('products/updated',{
                        layout: 'products',
                        title: "Thông tin chi tiết hàng hóa",
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
                        status:request.status,
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
                        status:request.status,
                    }
                    produdtDB.updated(data,id).then((result) =>{
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
    delete:  function(req, res){
        var proid = req.params.id;
        let aPro;
        produdtDB.view(proid).then((result) =>{
            aPro = result;
            let oldpath = './public/upload/products/'+aPro.slug;
            helpers.deleteDirectory(oldpath);
            produdtDB.deleteproducts(proid).then((result) =>{
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
        authlogin.authstaff(req, res);
        const data = req.body;
        let products, cates;
        produdtDB.seachproducts(data).then((result) => { products = result;}
        ).catch((err) => warning = err);
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);
        setTimeout(() =>{
            res.status(200).render('products/all',{
                layout: 'products',
                title: "Quản lý hàng hóa",
                csrfToken: req.csrfToken(),
                data:{products,cates},
                user:req.session['user'],
            });
        }, 100);
    },
    getcate:  function(req, res){
        data = req.body;
        categoryDB.getcate(data.parent_cate).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },

    check:  function(req, res) {
        let products, cates,supplies;
        authlogin.authstaff(req, res);
        produdtDB.product_supply().then((result) => { products = result;}
        ).catch((err) => warning = err);
        categoryDB.all('products').then((result) => { cates = result;}
        ).catch((err) => warning = err);
        supplyDB.all().then((result) => { supplies = result;}
        ).catch((err) => warning = err);
        setTimeout(() =>{
            res.status(200).render('products/check',{
                layout: 'products',
                title: "Kiểm duyệt thông tin hàng hóa từ nhà cung cấp",
                csrfToken: req.csrfToken(),
                data:{products,cates,supplies},
                user:req.session['user'],
            });
        }, 100);
    },
    selling:  function(req, res){
        var supplyid = req.params.id;
        let products,listproducts;
        authlogin.authstaff(req, res);
        sellingDB.selling().then((result) => { products = result;}
        ).catch((err) => warning = err);
        sellingDB.products().then((result) => { listproducts = result;}
        ).catch((err) => warning = err);
        setTimeout(() =>{
            res.status(200).render('products/selling',{
                layout: 'products',
                title: "Quản lý sản phẩm đăng bán của nhà cung cấp",
                csrfToken: req.csrfToken(),
                data:{products,listproducts,supplyid},
                user:req.session['user'],
            });
        }, 100);
    },
    selling_supply:  function(req, res){
        var supplyid = req.params.id;
        let products,listproducts;
        authlogin.authstaff(req, res);
        sellingDB.bysupply(supplyid).then((result) => { products = result;}
        ).catch((err) => warning = err);
        sellingDB.products().then((result) => { listproducts = result;}
        ).catch((err) => warning = err);
        setTimeout(() =>{
            res.status(200).render('supplies/selling',{
                layout: 'products',
                title: "Quản lý sản phẩm đăng bán của nhà cung cấp",
                csrfToken: req.csrfToken(),
                data:{products,listproducts,supplyid},
                user:req.session['user'],
            });
        }, 100);
    },
    post_selling: async function(req, res){
        var supplyid = req.params.id;
        authlogin.authstaff(req, res);
        const request = req.body;
        data ={
            p_id:request.p_id,
            name: request.name,
            price:request.price,
            address:request.address,
            phone: request.phone,
            amount: request.amount,
            supply_id:supplyid,
        }
        await sellingDB.created(data).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });

    },
    selling_view:  function(req, res){
        var supplyid = req.params.supplyid;
        var sid = req.params.id;
        sellingDB.view(sid,supplyid).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    selling_updated: function(req, res){
        var supplyid = req.params.supplyid;
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
        sellingDB.updated(data,id,supplyid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });

    },
    selling_delete: function(req, res){
        var supplyid = req.params.supplyid;
        authlogin.authstaff(req, res);
        var sid = req.params.id;
        let aPro;
        sellingDB.deleteselling(sid,supplyid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
};