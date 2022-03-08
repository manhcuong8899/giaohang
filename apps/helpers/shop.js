
function calculateRow(row,name) {
    var price = +row.find('input[name^="'+name+']').val();
    return price;

}
function calculateGrandTotal(name) {
    var grandTotal = 0;
    $("table.product-list").find('input[name^="'+weight+'"]').each(function () {
        grandTotal += +$(this).val();
    });
    return $("#grandtotal").text(grandTotal.toFixed(2));
}
module.exports ={
    calculateRow:calculateRow,
    calculateGrandTotal:calculateGrandTotal
}