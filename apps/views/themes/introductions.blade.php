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
        <div class="headerfix">
        <div class="header clearfix">
            @include('themes.includes.logo')
            <div class="hright">
                @include('themes.includes.menu_top')
            </div>
        </div><!-- /.header -->
        </div>
    </div>
    <div style="margin-bottom: 90px"></div>
    <!-- ==========  HEADER : END  ========== -->

    <!-- ==========  MAIN =================== -->
    <div class="pmain">
        <div class="container">
            @yield('main-content')
            @include('themes.includes.sidebar')
        </div>
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

        <script type="text/javascript">
            $(document).on('ready', function() {
                // update 2017-04-28
                $( ".list-products .grid-item" ).hover(function() {
                            $(this).addClass('on');
                            $(this).find('.info-view-color').show();
                            _id = $(this).find('.color-wrap').attr('id');
                            $("#"+_id+' .carousel-color').jCarouselLite({
                                btnNext: "#"+_id+" .next",
                                btnPrev: "#"+_id+" .prev",
                                circular: false,
                            });
                        }, function() {
                            $(this).removeClass('on');
                            $(this).find('.info-view-color').hide();
                        }
                );
                $('.carousel-color ul').each(function(){
                    var num = $(this).children().length;
                    if(num<='2'){
                        $(this).parents('.color-wrap').addClass('off').find('.btn-control').hide();
                    }
                });
                // end update 2017-04-28
               /* $('.dropdown li a').click(function(){
                    var href = $(this).attr('href');
                });*/

            });
        </script>

</div>
    @yield('page-script')
<!-- ===============  PAGE : END =============== -->
</body>
</html>