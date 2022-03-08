<script src="{{asset('themes/assets/js/vendor/jquery-3.5.1.min.js')}}"></script>
<!-- jQuery Migrate JS -->
<script src="{{asset('themes/assets/js/vendor/jQuery-migrate-3.3.0.min.js')}}"></script>
<!-- Modernizer JS -->
<script src="{{asset('themes/assets/js/vendor/modernizr-2.8.3.min.js')}}"></script>
<!-- Bootstrap JS -->
<script src="{{asset('themes/assets/js/vendor/bootstrap.bundle.min.js')}}"></script>
<!-- Slick Slider JS -->
<script src="{{asset('themes/assets/js/plugins/slick.min.js')}}"></script>
<!-- Countdown JS -->
<script src="{{asset('themes/assets/js/plugins/jquery.countdown.min.js')}}"></script>
<!-- Ajax JS -->
<script src="{{asset('themes/assets/js/plugins/jquery.ajaxchimp.min.js')}}"></script>
<!-- Jquery Nice Select JS -->
<script src="{{asset('themes/assets/js/plugins/jquery.nice-select.min.js')}}"></script>
<!-- Jquery Ui JS -->
<script src="{{asset('themes/assets/js/plugins/jquery-ui.min.js')}}"></script>
<!-- jquery magnific popup js -->
<script src="{{asset('themes/assets/js/plugins/jquery.magnific-popup.min.js')}}"></script>
<!-- Main JS -->
<script src="{{asset('themes/assets/js/main.js')}}"></script>
<!--Start of AutoAds Tracking Code-->
<script id='autoAdsMaxLead-widget-script' src='https://cdn.autoads.asia/scripts/autoads-maxlead-widget.js?business_id=02ED6806A167480BA8066B1ADB1479ED' type='text/javascript' charset='UTF-8' async></script>
<!--End of AutoAds Tracking Code-->
<script type="text/javascript">
            $('#pcstrans-minimize').click(function(){
                if($('#pcstrans-facebook').css('opacity')==0)
                {
                    $('#pcstrans-facebook').css('opacity',1);
                    $('.pcstrans-messages').animate({right:'0'}).animate({bottom:'0'});
                }
                else
                {
                    $('.pcstrans-messages').animate({bottom:'-400px'}).animate({right:'0'},400,function()
                    {$('#pcstrans-facebook').css('opacity',0)});
                }
            });
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'))

            function delRowProduct(id,rowid){
                $.ajax({
                    url: '{{url('cart/deleteitem')}}',
                    dataType: "html",
                    type: "post",
                    data: {_method: 'post', _token: '{{csrf_token()}}', rowId: rowid}
                }).done(function(data) {
                    location.reload();
                }).fail(function(data) {
                    alert('Xảy ra lỗi xóa sản phẩm trong giỏ hàng!');
                });
            }


</script>