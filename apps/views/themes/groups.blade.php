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
                @include('themes.includes.header_top')
                @include('themes.includes.menu_top')
            </div>
        </div><!-- /.header -->

        @include('themes.includes.trending')

    <!-- ==========  HEADER : END  ========== -->

    <!-- ==========  MAIN =================== -->
    <div class="pmain">
        <div class="list-col-tow clearfix">
            @include('themes.includes.flash')
            @yield('main-content')
          @include('themes.includes.sidebar_group')
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
                $('.multi-item-carousel').carousel({
                    interval: false,
                    wrap:false
                });
                if ($(".multi-item-carousel .carousel-inner .item:first").hasClass("active")) {
                    $(".multi-item-carousel").children(".left").hide();
                    $(".multi-item-carousel").children(".right").show();
                }

                $('.carousel').on('slid.bs.carousel', function () {
                    var carouselData = $(this).data('bs.carousel');
                    var currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));
                    $(this).children('.carousel-control').show();
                    if(currentIndex == 0){
                        $(this).children('.left.carousel-control').hide();
                    }else if(currentIndex+1 == carouselData.$items.length){
                        $(this).children('.right.carousel-control').hide();
                    }
                });
                $('.multi-item-carousel .item').each(function(){
                    var next = $(this).next();
                    if (!next.length) {
                        next = $(this).siblings(':first');
                    }
                    next.children(':first-child').clone().appendTo($(this));
                    if (next.next().length>0) {
                        next.next().children(':first-child').clone().appendTo($(this));
                    } else {
                        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
                    }
                });

                $('.multi-item-carousel .item a').hover(function(e) {
                    var $this = $(this);
                    var img = $this.attr('data-img-big');
                    //alert(img);
                    $(this).closest('.info-product').closest('.item-box').find('.cover img').attr('src',img);

                });
            });
        </script>

</div>
    @yield('page-script')
<!-- ===============  PAGE : END =============== -->
</body>
</html>