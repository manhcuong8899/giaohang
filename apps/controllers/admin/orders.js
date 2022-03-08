const var_dump = require('var_dump');
const orderDB = require('../../models/OrderDB');
const configDB = require('../../models/ConfigDB');
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    all:  function(req, res) {
        authlogin.authstaff(req, res);
        let warning; let listsorders;
        let status;
        orderDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);

        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);


        orderDB.all().then((result) => {listsorders = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('orders/all',{
                layout: 'orders',
                title: 'Quản lý đơn hàng mua hộ',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city},
                user:req.session['user'],
            });
        }, 100);
    },
    bystatus:  function(req, res) {
        authlogin.authstaff(req, res);
        var statuscode = req.params.code;
        let warning; let listsorders;
        let status;
        orderDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);

        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);

        orderDB.listbystatus(statuscode).then((result) => {listsorders = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('orders/all',{
                layout: 'orders',
                title: 'Quản lý đơn hàng mua hộ',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city},
                user:req.session['user'],
            });
        }, 100);
    },
    seach: function(req, res){
        authlogin.authstaff(req, res);
        const data = req.body;
        let warning; let listsorders;
        let status;
        orderDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);

        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);
        orderDB.seach(data).then((result) => { listsorders = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('orders/all',{
                layout: 'orders',
                title: 'Kết quả tìm kiếm',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city},
                user:req.session['user'],
            });
        }, 100);
    },

    delete: async function(req, res){
        authlogin.authstaff(req, res);
        var ordercode = req.params.code;
        let orderid;
       await orderDB.getorderid(ordercode).then((result) => {
            orderid = result;
            orderDB.deleteorder(orderid).then((result) => {
                orderDB.deleteorderdetail(orderid).then((result) => {
                    res.redirect('back');
                }).catch((err) => warning = err);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
    detail: function(req, res){
        authlogin.authstaff(req, res);
        var code = req.params.code;
        let aorders, listdetail,status,Totals=0;
        let orderid;
        orderDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        orderDB.getorderid(code).then((result) => {
            orderid = result;
            orderDB.view(orderid).then((result) => {
                aorders=result;
                Totals = aorders.totals + aorders.feeship + aorders.feepack + aorders.feebuy;
                orderDB.listdetail(orderid).then((detail) => {
                    listdetail=detail;
                }).catch((err) => warning = err);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('orders/detail',{
                layout: 'orders',
                title: 'Thông tin đơn hàng',
                csrfToken: req.csrfToken(),
                data:{code,aorders,listdetail,status,Totals},
                user:req.session['user'],
            });
        }, 100);
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
};