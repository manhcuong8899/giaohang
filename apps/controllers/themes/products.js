const helpers = require('../../helpers/hepler');
const configDB = require('../../models/ConfigDB');
const sellingDB = require('../../models/SellingDB');
const categoryDB = require('../../models/Category');
const fs = require('fs');
module.exports = {
    listproducts:  async function(req, res){
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);

        var code = req.params.code;
            code = code.toUpperCase();
        var slug = req.params.slug;
        let cate_dsmb,cate_dsmn, cate_dstn,acate;
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);

        categoryDB.byslug(code,slug).then((result) => {acate = result;
        }).catch((err) => warning = err);
        let listproducts;
        await sellingDB.listproducts(code,slug).then((result) => {listproducts = result;
        }).catch((err) => warning = err);

        setTimeout(() =>{
            res.status(200).render('themes/products/listproducts',{
                layout: 'themes/products',
                title: acate.name,
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn, cate_dstn,listproducts,acate},
                cart:req.session.cart,
                members:req.session['members'],
                code:code,
            });
        }, 100);
    },

    detailproducts: async function(req, res){
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);

        var slug = req.params.slug;
            slug = helpers.spit(slug);
        let cate_dsmb,cate_dsmn, cate_dstn;
        var viewimages = [];

        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);

        let aPro;
       sellingDB.detailproducts(slug).then((result) => {aPro = result;
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
        }).catch((err) => warning = err);
        await setTimeout(() =>{
            res.status(200).render('themes/products/detailproducts',{
                layout: 'themes/detailproducts',
                title: "Chi tiết sản phẩm",
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn, cate_dstn,aPro,viewimages},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);


    }
};