const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const rolesDB = require('../../models/RolesDB');
const discountDB = require('../../models/DiscountDB')
const suppliesDB = require('../../models/SuppliesDB')
const shopsDB = require('../../models/ShopDB')
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    supply:  function(req, res) {
        const supplyid = req.params.id;
        let discount,supply;
        authlogin.authstaff(req, res);
        discountDB.supply(supplyid).then((result) => { discount = result})
            .catch((err) => warning = err);

        suppliesDB.view(supplyid).then((result) => { supply = result;})
            .catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('discount/supply', {
                layout: 'discount',
                title: 'Thỏa thuận chiết khấu đơn vị cung cấp',
                csrfToken: req.csrfToken(),
                data:{discount,supply},
                user:req.session['user'],
            });
        }, 100);
    },
    created_supply: function(req, res){
        const supplyid = req.params.id;
        const request = req.body;
        data ={
            name: request.name,
            value: request.value,
            discount: request.discount,
            supply_id:supplyid,
        }
        discountDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },

    shop:  function(req, res) {
        const shopid = req.params.id;
        let discount,shop;
        authlogin.authstaff(req, res);
        discountDB.shop(shopid).then((kq) => { discount = kq;})
            .catch((err) => warning = err);
        shopsDB.view(shopid).then((result) => { shop = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('discount/shop', {
                layout: 'discount',
                title: 'Thỏa thuận chiết khấu Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{discount,shop},
                user:req.session['user'],
            });
        }, 100);
    },
    created_shop: function(req, res){
        const shopid = req.params.id;
        const request = req.body;
        data ={
            name: request.name,
            value: request.value,
            discount: request.discount,
            shop_id:shopid,
        }
        discountDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },

    delete:  function(req, res){
        var discountid = req.params.id;
        discountDB.deletediscount(discountid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view:  function(req, res){
        var id = req.params.id;
        discountDB.view(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        discountDB.updated(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
};