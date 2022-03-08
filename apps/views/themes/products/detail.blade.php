@extends('themes.productsdetail')
@section('page_title')

@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3">{{$cate->name}}</h3>
                        <ul>
                            <li><a href="#">Sản phẩm </a></li>
                            <li>{{$cate->name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Single Product Main Area Start -->
    <div class="single-product-main-area">
        <div class="container container-default custom-area">
            <div class="row">
                <div class="col-lg-5 col-custom">
                    <div class="product-details-img horizontal-tab">
                        <div class="product-slider popup-gallery product-details_slider" data-slick-options='{
                        "slidesToShow": 1,
                        "arrows": false,
                        "fade": true,
                        "draggable": false,
                        "swipe": false,
                        "asNavFor": ".pd-slider-nav"
                        }'>
                            @foreach($files_images as $key=>$url)
                            <div class="single-image border">
                                <a href="{{asset('public/images/'.$url)}}">
                                    <img src="{{asset('public/images/'.$url)}}" alt="{{$detailproduct->name}}">
                                </a>
                            </div>
                            @endforeach
                        </div>
                        <div class="pd-slider-nav product-slider" data-slick-options='{
                        "slidesToShow": 4,
                        "asNavFor": ".product-details_slider",
                        "focusOnSelect": true,
                        "arrows" : false,
                        "spaceBetween": 30,
                        "vertical" : false
                        }' data-slick-responsive='[
                            {"breakpoint":1501, "settings": {"slidesToShow": 4}},
                            {"breakpoint":1200, "settings": {"slidesToShow": 4}},
                            {"breakpoint":992, "settings": {"slidesToShow": 4}},
                            {"breakpoint":575, "settings": {"slidesToShow": 3}}
                        ]'>
                            @foreach($files_images as $key=>$url)
                            <div class="single-thumb border">
                                <img src="{{asset('public/images/'.$url)}}" alt="Product Thumnail">
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                <div class="col-lg-7 col-custom">
                    <div class="product-summery position-relative">
                        <div class="product-head mb-3">
                            <h2 class="product-title">{{$detailproduct->name}}</h2>
                        </div>
                        <div class="price-box mb-2">
                            <span class="regular-price">{{number_format($detailproduct->price,'0',',','.')}}</span>
                            <span class="old-price"><del>{{number_format($detailproduct->listprice,'0',',','.')}}</del> vnđ</span>
                        </div>
                        <div class="product-rating mb-3">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <div class="sku mb-3">
                            <span>MSP: {{$detailproduct->code}}</span>
                        </div>
                        @if($detailproduct->brand_id!=0)
                        <div class="sku mb-3">
                            <span>MSP: {{$detailproduct->Brands()}}</span>
                        </div>
                        @endif
                        <p class="desc-content">
                            {!! $detailproduct->short !!}</p>
                        <div class="quantity-with_btn mb-4">
                            <div class="quantity">
                                <div class="cart-plus-minus">
                                    <input  class="cart-plus-minus-box" value="1" min="1" step="1" type="number" title="Vui lòng chọn số lượng." name="quantity" id="quantity">
                                    <div class="dec qtybutton">-</div>
                                    <div class="inc qtybutton">+</div>
                                </div>
                            </div>
                            <div class="add-to_cart">
                                <a class="btn obrien-button primary-btn" id="addcart">Thêm vào giỏ hàng</a>
                            </div>
                        </div>
                        <div class="buy-button mb-5">
                            <a href="{{url('cart')}}" class="btn obrien-button-3 black-button">XEM GIỎ HÀNG</a>
                        </div>
                        <div class="social-share mb-4">
                            <span>Chia sẻ :</span>
                            <a href="#"><i class="fa fa-facebook-square facebook-color"></i></a>
                            <a href="#"><i class="fa fa-twitter-square twitter-color"></i></a>
                            <a href="#"><i class="fa fa-linkedin-square linkedin-color"></i></a>
                            <a href="#"><i class="fa fa-pinterest-square pinterest-color"></i></a>
                        </div>
                        <div class="payment">
                            <a href="#"><img class="border" src="{{asset('themes/assets/images/payment/img-payment.png')}}" alt="Payment"></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-no-text">
                <div class="col-lg-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" id="home-tab" data-toggle="tab" href="#connect-1" role="tab" aria-selected="true">Chi tiết sản phẩm</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercase" id="profile-tab" data-toggle="tab" href="#connect-2" role="tab" aria-selected="false">Chính sách vận chuyển</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercase" id="contact-tab" data-toggle="tab" href="#connect-3" role="tab" aria-selected="false">Đánh giá</a>
                        </li>
                    </ul>
                    <div class="tab-content mb-text" id="myTabContent">
                        <div class="tab-pane fade show active" id="connect-1" role="tabpanel" aria-labelledby="home-tab">
                            <div class="desc-content">
                                    {!! $detailproduct->long !!}
                            </div>
                        </div>
                        <div class="tab-pane fade" id="connect-2" role="tabpanel" aria-labelledby="home-tab">
                            <div class="desc-content">
                                {!! $detailproduct->shipping !!}
                            </div>
                        </div>
                        <div class="tab-pane fade" id="connect-3" role="tabpanel" aria-labelledby="profile-tab">
                            <!-- Start Single Content -->
                            <div class="product_tab_content  border p-3">
                                <div class="rating_wrap">
                                    <h5 class="rating-title-1 mb-2">Gửi đánh giá Review sản phẩm </h5>
                                    <p class="mb-2">Địa chỉ email của bạn sẽ được bảo mật. Các trường bắt buộc được đánh dấu *</p>
                                    <h6 class="rating-title-2 mb-2">Điểm đánh giá</h6>
                                    <div class="rating_list mb-4">
                                        <div class="review_info">
                                            <div class="product-rating mb-3">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star-o"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- End RAting Area -->
                                <div class="comments-area comments-reply-area">
                                    <div class="row">
                                        <div class="col-lg-12 col-custom">
                                            <form action="#" class="comment-form-area">
                                                <div class="row comment-input">
                                                    <div class="col-md-6 col-custom comment-form-author mb-3">
                                                        <label>Họ và Tên<span class="required">*</span></label>
                                                        <input type="text" required="required" name="name">
                                                    </div>
                                                    <div class="col-md-6 col-custom comment-form-emai mb-3">
                                                        <label>Địa chỉ Email <span class="required">*</span></label>
                                                        <input type="text" required="required" name="email">
                                                    </div>
                                                </div>
                                                <div class="comment-form-comment mb-3">
                                                    <label>Nội dung Review đánh giá</label>
                                                    <textarea class="comment-notes" required="required" name="long"></textarea>
                                                </div>
                                                <div class="comment-form-submit">
                                                    <input type="submit" value="Gửi Review" class="comment-submit btn obrien-button primary-btn">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End Single Content -->
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Single Product Main Area End -->
    <!-- Product Area Start Here -->
    <div class="product-area mb-text">
        <div class="container container-default custom-area">
            <div class="row">
                <div class="col-lg-5 m-auto text-center col-custom">
                    <div class="section-content">
                        <h2 class="title-1 text-uppercase">SẢN PHẨM TƯƠNG TỰ</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 product-wrapper col-custom">
                    <div class="product-slider" data-slick-options='{
                        "slidesToShow": 4,
                        "slidesToScroll": 1,
                        "infinite": true,
                        "arrows": false,
                        "dots": false
                        }' data-slick-responsive='[
                        {"breakpoint": 1200, "settings": {
                        "slidesToShow": 3
                        }},
                        {"breakpoint": 992, "settings": {
                        "slidesToShow": 2
                        }},
                        {"breakpoint": 576, "settings": {
                        "slidesToShow": 1
                        }}
                        ]'>
                        @foreach($alsolikes as $key=>$list)
                        <div class="single-item">
                            <div class="single-product position-relative">
                                <div class="product-image">
                                    <a class="d-block" href="{{url($list->slug)}}">
                                        <img src="{{asset('public/images/products/'.$list->code.'/'.$list->images)}}" alt="" class="product-image-1 w-100">
                                        <img src="{{asset('public/images/products/'.$list->code.'/'.$list->images)}}" alt="" class="product-image-2 position-absolute w-100">
                                    </a>
                                </div>
                                <div class="product-content">
                                    <div class="product-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                    <div class="product-title">
                                        <h4 class="title-2"> <a href="{{url($list->slug)}}">{{$list->name}}</a></h4>
                                    </div>
                                    <div class="price-box">
                                        <span class="regular-price ">{{number_format($list->price,'0',',','.')}}</span>
                                        <span class="old-price"><del>{{number_format($list->listprice,'0',',','.')}}</del> vnđ</span>
                                    </div>
                                </div>
                                <div class="add-action d-flex position-absolute">
                                    <a title="Thêm vào giỏ hàng" onclick="addcart('{{ url('ajax/addcart/'.$list->id) }}')"> <i  class="ion-bag"></i></a>
                                    <a title="Xem nhanh" onclick="viewproduct('{{ url('ajax/viewproduct/'.$list->id) }}')">  <i class="ion-eye"></i></a>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Product Area End Here -->
    <!-- Product Area Start Here -->
    <div class="product-area mb-text">
        <div class="container container-default custom-area">
            <div class="row">
                <div class="col-lg-5 m-auto text-center col-custom">
                    <div class="section-content">
                        <h2 class="title-1 text-uppercase">SẢN PHẨM ĐÃ XEM</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 product-wrapper col-custom">
                    <div class="product-slider" data-slick-options='{
                        "slidesToShow": 4,
                        "slidesToScroll": 1,
                        "infinite": true,
                        "arrows": false,
                        "dots": false
                        }' data-slick-responsive='[
                        {"breakpoint": 1200, "settings": {
                        "slidesToShow": 3
                        }},
                        {"breakpoint": 992, "settings": {
                        "slidesToShow": 2
                        }},
                        {"breakpoint": 576, "settings": {
                        "slidesToShow": 1
                        }}
                        ]'>
                        @foreach( $pview as $keyindex=>$apview )
                            <div class="single-item">
                                <div class="single-product position-relative">
                                    <div class="product-image">
                                        <a class="d-block" href="{{url($apview->options->slug)}}">
                                            <img src="{{asset('public/images/products/'.$apview->options->code.'/'.$apview->options->images)}}" alt="" class="product-image-1 w-100">
                                        </a>
                                    </div>
                                    <div class="product-content">
                                        <div class="product-rating">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                        </div>
                                        <div class="product-title">
                                            <h4 class="title-2"> <a href="{{url($apview->options->slug)}}">{{$apview->name}}</a></h4>
                                        </div>
                                        <div class="price-box">
                                            <span class="regular-price ">{{number_format($apview->price,'0',',','.')}}</span>
                                        </div>
                                    </div>
                                    <div class="add-action d-flex position-absolute">
                                        <a title="Thêm vào giỏ hàng" onclick="addcart('{{ url('ajax/addcart/'.$apview->id) }}')"> <i  class="ion-bag"></i></a>
                                        <a title="Xem nhanh" onclick="viewproduct('{{ url('ajax/viewproduct/'.$apview->id) }}')">  <i class="ion-eye"></i></a>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('page-script')
    <script type="text/javascript">
        $(document).on('ready', function() {
            function get_price_number(string){
                var price = string.replace('$', '');
                return Number(price);
            }
            $('#addcart').click(function(){
                var qty = get_price_number($('#quantity').val());
                if(qty<1){$('.btn-qty').tooltip('show');}else{$('.btn-qty').tooltip('hide');}
                if(qty>0){
                    $('.select2').removeClass('error-form');
                    var price = '{{$detailproduct->price}}';
                    var shipping = 0;
                    var sum = qty*price+shipping;
                    var productid = '{{$detailproduct->id}}';
                    /* Hàm Ajax xử lý đặt hàng online */
                    $.ajax({
                        url: '{{url('addcart')}}',
                        dataType: "json",
                        type: "post",
                        data: {_method: 'post', _token: '{{csrf_token()}}',productid: productid, quantity: qty}
                    }).done(function(data){
                        location.reload();
                    }).fail(function(data) {

                    });
                    /*Kết thúc hàm Ajax xử lý đặt hàng online */
                }else{
                    $('.select2').addClass('error-form');
                }
            });
        });

    </script>
@endsection