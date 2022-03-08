const authlogin = require('../../helpers/auth');
const deliveryDB = require('../../models/DeliveryDB');
module.exports = {
    dashboard:  function(req, res) {
        authlogin.authshop(req, res);
        let shopid = req.session['user'].shop_id;
        let listtotals;
        let listmoney;
        let totals = new Array();
        let summoney = new Array();
        deliveryDB.s_total(shopid).then((result) => {
            listtotals = result;
            totals['drap'] = listtotals[0][0].drap;
            totals['new'] = listtotals[1][0].new;
            totals['confirm'] = listtotals[2][0].confirm;
            totals['takeship'] = listtotals[3][0].takeship;
            totals['receivedship'] = listtotals[4][0].receivedship;
            totals['shipping'] = listtotals[5][0].shipping;
            totals['finish'] = listtotals[6][0].finish;
            totals['sreturn'] = listtotals[7][0].sreturn;
            totals['returnshop'] = listtotals[8][0].returnshop;
            totals['cancel'] = listtotals[9][0].cancel;
            totals['checking'] = listtotals[10][0].checking;
            totals['checked'] = listtotals[11][0].checked;
            totals['delivery'] = listtotals[12][0].delivery;
        }).catch((err) => warning = err);

        deliveryDB.summoney(shopid).then((result) => {
            listmoney = result;
            summoney['totalmoney'] = listmoney[0][0].totalmoney;
            summoney['feeorder'] = listmoney[1][0].feeorder;
            summoney['feeship'] = listmoney[2][0].feeship;
        }).catch((err) => warning = err);

        let chuachuyen;
        deliveryDB.status_chuachuyen().then((result) => {
            chuachuyen = result;
        }).catch((err) => warning = err);

        let  giaokhach;
        deliveryDB.status_giaokhach().then((result) => {
            giaokhach = result;
        }).catch((err) => warning = err);

        let  trahuy;
        deliveryDB.status_trahuy().then((result) => {
            trahuy = result;
        }).catch((err) => warning = err);

        let  doisoat;
        deliveryDB.status_doisoat().then((result) => {
            doisoat = result;
        }).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('shop/dashboard',{
                layout: 'shop/main',
                title: 'Bảng điều khiển Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{totals,summoney,chuachuyen,giaokhach,trahuy,doisoat},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },
};