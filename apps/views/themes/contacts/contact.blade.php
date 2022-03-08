@extends('themes.articles')
@section('page_title')
@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3">THÔNG TIN LIÊN HỆ</h3>
                        <ul>
                            <li><a href="#">Liên hệ </a></li>
                            <li>Mua hàng</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Blog Main Area Start Here -->
    <div class="contact-us-area">
        <div class="container container-default-2 custom-area">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-custom">
                    <div class="contact-info-item">
                        <div class="con-info-icon">
                            <i class="ion-ios-location-outline"></i>
                        </div>
                        <div class="con-info-txt">
                            <h4>Địa chỉ</h4>
                            <p>{{$settings['address']}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-custom">
                    <div class="contact-info-item">
                        <div class="con-info-icon">
                            <i class="ion-iphone"></i>
                        </div>
                        <div class="con-info-txt">
                            <h4>Hỗ trợ Hotline</h4>
                            <p>Mobile: {{$settings['phone']}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 col-custom text-align-center">
                    <div class="contact-info-item">
                        <div class="con-info-icon">
                            <i class="ion-ios-email-outline"></i>
                        </div>
                        <div class="con-info-txt">
                            <h4>Email</h4>
                            <p>{{$settings['email']}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact Us Area End Here -->
    <!-- Google Maps -->
    <div class="google-map-area">
        <div id="contacts" class="map-area">
            <div> {!!$settings['googlemap']!!}</div>
        </div>
    </div>
    <!-- Blog Main Area End Here -->
@endsection
@section('page-script')
@endsection