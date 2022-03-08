const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const rolesDB = require('../../models/RolesDB');
const pricelistDB = require('../../models/PricelistDB')
const shopDB = require('../../models/ShopDB')
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    transportfee:  function(req, res) {
        authlogin.authstaff(req, res);
        let shop;
        const shopid = req.params.id;
        let listNT, listNM,listLM;
        shopDB.view(shopid).then((result) => { shop = result;})
            .catch((err) => warning = err);
        pricelistDB.NTfee(shopid).then((result) => { listNT = result;})
            .catch((err) => warning = err);

        pricelistDB.NMfee(shopid).then((result) => { listNM = result})
            .catch((err) => warning = err);

        pricelistDB.LMfee(shopid).then((result) => { listLM = result})
            .catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('pricelist/transportfee', {
                layout: 'pricelist',
                title: 'Cấu hình bảng giá vận chuyển',
                csrfToken: req.csrfToken(),
                data:{shop,listNT,listNM,listLM},
                user:req.session['user'],
            });
        }, 100);
    },
    created: function(req, res){
        const shopid = req.params.id;
        const request = req.body;
        data ={
            name: request.name,
            value:request.value,
            fee: request.fee,
            type:request.type,
            type_cost:1,
            status:1,
            shop_id:shopid,
        }
        pricelistDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete:  function(req, res){
        var priceid = req.params.id;
        pricelistDB.deleteprice(priceid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view:  function(req, res){
        var id = req.params.id;
        pricelistDB.view(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        pricelistDB.updated(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },

    updated_orderfee:  function(req, res){
        const id = req.params.id;
        const request = req.body;
        let fee = request.fee[0];
        let value =request.value[0];
        if(request.update_type=='KD'){
            value = request.value[1];
            fee = request.fee[1];
        }
        data ={
            code: request.code,
            name: request.name,
            value:value,
            fee: fee,
            type: request.type,
            type_cost:3,
            status:1
        }
        pricelistDB.updated(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },

    codfee:  function(req, res) {
        authlogin.authstaff(req, res);
        let shop,listcod;
        const shopid = req.params.id;
        shopDB.view(shopid).then((result) => { shop = result;})
            .catch((err) => warning = err);
        pricelistDB.codfee(shopid).then((result) => { listcod = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('pricelist/codfee', {
                layout: 'pricelist',
                title: 'Cấu hình bảng giá thu hộ',
                csrfToken: req.csrfToken(),
                data:{shop,listcod},
                user:req.session['user'],
            });
        }, 100);
    },
    created_cod: function(req, res){
        const shopid = req.params.id;
        const request = req.body;
        data ={
            name: request.name,
            value:request.value,
            fee: request.fee,
            type_cost:2,
            status:1,
            shop_id:shopid
        }
        pricelistDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    orderfee:  function(req, res) {
        authlogin.authstaff(req, res);
        let listMH, listKD;
        pricelistDB.MHfee().then((result) => { listMH = result;})
            .catch((err) => warning = err);
        pricelistDB.KDfee().then((result) => { listKD = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('pricelist/orderfee', {
                layout: 'pricelist',
                title: 'Cấu hình bảng giá mua hộ',
                csrfToken: req.csrfToken(),
                data:{listMH, listKD},
                user:req.session['user'],
            });
        }, 100);
    },
    created_order: function(req, res){
        const request = req.body;
        let fee = request.fee[0];
        let value =request.value[0];
        if(request.type=='KD'){
            value = request.value[1];
            fee = request.fee[1];
        }
        data ={
            code: request.code,
            name: request.name,
            value:value,
            fee: fee,
            type: request.type,
            type_cost:3,
            status:1
        }
        pricelistDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },

};