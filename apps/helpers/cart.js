function Total(cart) {
    if(!cart){
        return 0;
    }
    let Total=0;
    for (var i =0; i< cart.length; i++){
        Total = Total + cart[i].totals;
        }
    return Total;
};

function TotalQty(cart) {
    if(!cart){
        return 0;
    }
    let TotalQty=0;
    for (var i =0; i< cart.length; i++){
        TotalQty = TotalQty + parseInt(cart[i].qty);
    }
    return TotalQty;
};

module.exports ={
    Total:Total,
    TotalQty:TotalQty
}