const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const deliveryDB = require('../../models/DeliveryDB');
const configDB = require('../../models/ConfigDB');
const shopDB = require('../../models/ShopDB');
const addressDB = require('../../models/AddressDB');
const usersDB = require('../../models/UsersDB')
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    all:  function(req, res) {
        authlogin.authstaff(req, res);
        let warning; let listsorders;
        let status;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);
        let shop;
        shopDB.all().then((result) => { shop = result})
            .catch((err) => warning = err);

        deliveryDB.all().then((result) => {listsorders = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('delivery/all',{
                layout: 'delivery',
                title: 'Quản lý vận đơn',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city,shop},
                user:req.session['user'],
            });
        }, 100);
    },
    bystatus:  function(req, res) {
        authlogin.authstaff(req, res);
        var statuscode = req.params.code;
        let warning; let listsorders;
        let status;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);

        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);

        let shop;
        shopDB.all().then((result) => { shop = result})
            .catch((err) => warning = err);

        deliveryDB.listbystatus(statuscode).then((result) => {listsorders = result;})
            .catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('delivery/all',{
                layout: 'delivery',
                title: 'Quản lý vận đơn',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city,shop},
                user:req.session['user'],
            });
        }, 100);
    },
    seach: function(req, res){
        authlogin.authstaff(req, res);
        const data = req.body;
        let warning; let listsorders;
        let status;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);
        let shop;
        shopDB.all().then((result) => { shop = result})
            .catch((err) => warning = err);
        deliveryDB.seach(data).then((result) => { listsorders = result;
        console.log(listsorders)}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('delivery/all',{
                layout: 'delivery',
                title: 'Kết quả tìm kiếm vận đơn',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city,shop},
                user:req.session['user'],
            });
        }, 100);
    },

    delete: async function(req, res){
        authlogin.authstaff(req, res);
        var ordercode = req.params.code;
        let orderid;
        await deliveryDB.getorderid(ordercode).then((result) => {
            orderid = result;
            deliveryDB.deleteorder(orderid).then((result) => {
                deliveryDB.deleteorderdetail(orderid).then((result) => {
                    res.redirect('back');
                }).catch((err) => warning = err);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
    detail: function(req, res){
        authlogin.authstaff(req, res);
        var code = req.params.code;
        let aorders, listdetail,status,Totals = 0,Totalskg=0;
        let orderid;
        let addshop;
        let listshippers;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        deliveryDB.getorderid(code).then((result) => {
            orderid = result;
            deliveryDB.view(orderid).then((result) => {
                aorders=result;
                Totals = Totals + parseInt(aorders.totalmoney) + parseInt(aorders.feeorder) + parseInt(aorders.feeship);
                deliveryDB.listdetail(orderid).then((detail) => {
                    listdetail=detail;
                    listdetail.forEach(function(value) {
                        Totalskg = Totalskg + value.weight;
                    });
                }).catch((err) => warning = err);
                addressDB.view_address(aorders.addressshop,aorders.shop_id).then((result) => {addshop = result;
                }).catch((err) => warning = err);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);

        usersDB.getshippers().then((result)=>{
            listshippers =result;
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('delivery/detail',{
                layout: 'delivery',
                title: 'Chi tiết vận đơn',
                csrfToken: req.csrfToken(),
                data:{code,aorders,listdetail,status,addshop,Totalskg,Totals,listshippers},
                user:req.session['user'],
            });
        }, 100);
    },
    getaddshipper:  function(req, res){
        var code = req.params.code;
        let shipperid;
        let data;
        deliveryDB.getordershipper_id(code).then((result) => {
            shipperid = result;

            usersDB.view(shipperid).then((result) => {
                data=result;
                res.send(data);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },

    addshipper:  function(req, res){
        var code = req.params.code;
        let orderid;
        const data = req.body;
        deliveryDB.getorderid(code).then((result) =>{
            orderid = result;
            deliveryDB.addshipper(data,orderid).then((result) =>{
                res.redirect('back');
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
    getaddstatus:  function(req, res){
        var code = req.params.code;
        let data, orderid;
        deliveryDB.getorderid(code).then((result) => {
            orderid = result;
            deliveryDB.view(orderid).then((result) => {
                data = result;
                res.send(data);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
    addstatus:  function(req, res){
        var code = req.params.code;
        let orderid;
        const data = req.body;
        deliveryDB.getorderid(code).then((result) =>{
            orderid = result;
            deliveryDB.addstatus(data,orderid).then((result) =>{
                res.redirect('back');
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },

    updated:  function(req, res){
        authlogin.authstaff(req, res);
        const code = req.params.code;
        let data = req.body;
        let orderid;
        orderDB.getorderid(code).then((result) => {
            orderid = result;
            orderDB.updated(data,orderid).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });
        }).catch((err) => warning = err);
    },
    cancel: async function(req, res){
        authlogin.authstaff(req, res);
        var ordercode = req.params.code;
        let orderid;
        await deliveryDB.getorderid(ordercode).then((result) => {
            orderid = result;
             deliveryDB.cancel(orderid).then((result) => {
                 res.redirect('back');
            }).catch((err) => warning = err);

        }).catch((err) => warning = err);
    },
    confirm: async function(req, res){
        authlogin.authstaff(req, res);
        var ordercode = req.params.code;
        let orderid;
        await deliveryDB.getorderid(ordercode).then((result) => {
            orderid = result;
            deliveryDB.confirm(orderid).then((result) => {
                res.redirect('back');
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
};