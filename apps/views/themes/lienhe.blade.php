<!DOCTYPE html>
<html>
<head>
    @include('themes.includes.header')
</head>

<body>
<div id="page"  class="wsmenucontainer clearfix">
    <div class="overlapblackbg"></div>

    <!-- ==========  HEADER ================= -->
    <div id="pheader">
        <div class="header clearfix">
            @include('themes.includes.logo')
            <div class="hright">
                @include('themes.includes.menu_top')
            </div>
        </div><!-- /.header -->

        @include('themes.includes.trending')

    <!-- ==========  HEADER : END  ========== -->

    <!-- ==========  MAIN =================== -->
        <div class="pmain">
            <div class="container">
                <div class="col-md-12">
                    <ol class="breadcrumb">
                        <li><a href="/">Trang chủ</a></li>
                        <li class="active">Liên hệ</li>
                    </ol>
                </div>
            </div>
            @yield('main-content')
    </div>
    <!-- ==========  MAIN : END ============= -->

        @include('themes.includes.modal')
    <!-- ==========  FOOTER =================-->

    <div id="footer">
        @include('themes.includes.footer')
    </div>
    <!-- ==========  FOOTER : END =========== -->
        <p id="back-top" style="display: block;"> <a href="#top"><i class="fa fa-chevron-up" aria-hidden="true"></i></a> </p>

        @include('themes.includes.script')

        <script src="{{ asset('themes/assets/vendors/icheck/icheck.js') }}"></script>
        <script src="{{ asset('themes/assets/vendors/zoom/easyzoom.js') }}"></script>
        <script src="{{ asset('themes/assets/vendors/select/js/select2.js') }}"></script>


        <script type="text/javascript">
            $(document).on('ready', function() {
                $('.add-to-cart').click(function(){
                    var qty = get_price_number($('.product-detail .btn-qty').val());
                    if(qty<1){$('.btn-qty').tooltip('show');}else{$('.btn-qty').tooltip('hide');}
                    if(qty>0){
                        $('.select2').removeClass('error-form');
                        var price = get_price_number($('.product-detail .price .new').text());
                        var shipping = 0;
                        var sum = qty*price+shipping;
                        var productid = $('#add_cart').val();
                        $('.modal-price').html('$'+price);
                        $('.modal-qty').html(qty);
                        $('.cartQty span').html(qty);
                        $('.modal-total').html('$'+sum);
                        $('#myModalCardView').modal('show');
                        /* Hàm Ajax xử lý đặt hàng online */
                        $.ajax({
                            url: '{{url('addcart')}}',
                            dataType: "json",
                            type: "post",
                            data: {_method: 'post', _token: '{{csrf_token()}}',productid: productid, quantity: qty}
                        }).done(function(data){
                            $('#myModalCardView [name="images"]').attr("src",data.images);
                            $('#myModalCardView [name="nameproduct"]').html(data.name);
                            $('#myModalCardView [name="codeproduct"]').html(data.code);
                            $('#myModalCardView [name="quantityproduct"]').html(data.quantity);
                            $('#myModalCardView [name="quantitycart"]').html(data.quantitycart);
                            $('#myModalCardView [name="pricecart"]').html(data.pricecart);
                            $('#myModalCardView [name="totalcart"]').html(data.totalcartship);
                            $('.exp-cart-qty').html(data.total);
                        }).fail(function(data) {
                            alert('Xảy ra lỗi thêm sản phẩm vào giỏ hàng!');
                        });

                        /*Kết thúc hàm Ajax xử lý đặt hàng online */

                    }else{
                        $('.select2').addClass('error-form');
                    }
                });

                $(".select2-style").select2({
                    minimumResultsForSearch: Infinity,
                }).on("change", function(e) {
                    actual_value = $(".select2-style").find(':selected').text();
                    if (actual_value.indexOf("Số Lượng") > -1){
                        return
                    }
                    newtext = "Số Lượng " +actual_value;

                    $(".select2-selection__rendered").text(newtext);
                });

                var $easyzoom = $('.easyzoom').easyZoom();
                var api = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
                $('.thumbnails a').hover(function(e) {
                    var $this = $(this);
                    $('.thumbnails li').removeClass('active');
                    $this.closest( "li" ).addClass('active');
                    e.preventDefault();
                    api.swap($this.data('standard'), $this.attr('href'));
                });
            });

        </script>

</div>
    @yield('page-script')
<!-- ===============  PAGE : END =============== -->
</body>
</html>