@extends('themes.members')
@section('page_title')
@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3">ĐĂNG KÝ THÀNH VIÊN</h3>
                        <ul>
                            <li><a href="#">Trang chủ </a></li>
                            <li>Đăng ký</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('themes.includes.flash')
    <!-- Shop Main Area Start Here -->
    <!-- Login Area Start Here -->
    <div class="login-register-area mt-no-text mb-no-text">
        <div class="container container-default-2 custom-area">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
                    <div class="login-register-wrapper">
                        <div class="section-content text-center mb-5">
                            <h2 class="title-4 mb-2">ĐĂNG KÝ THÀNH VIÊN MUA HÀNG</h2>
                            <p class="desc-content">Vui lòng điền thông tin đăng ký theo form</p>
                        </div>
                        <form method="POST" action="{{ url('member/register') }}" id="idFormregister">
                            {!! csrf_field() !!}
                            <div class="single-input-item mb-3">
                                <input type="email" placeholder="Nhập thông tin email" name="email" id="email">
                            </div>
                            <div class="single-input-item mb-3">
                                <input type="password" placeholder="Mật khẩu" name="password" id="password">
                            </div>
                            <div class="single-input-item mb-3">
                                <input type="password" placeholder="Xác nhận lại mật khẩu" name="confirmpassword" id="confirmpassword">
                            </div>
                            <div class="single-input-item mb-3">
                                <input type="text" placeholder="Họ và Tên" name="full_name" id="full_name">
                            </div>
                            <div class="single-input-item mb-3">
                                <input type="text" placeholder="Điện thoại" name="phone" id="phone">
                            </div>
                            <div class="single-input-item mb-3">
                                <div class="login-reg-form-meta d-flex align-items-center justify-content-between">
                                    <div class="remember-meta mb-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="rememberMe">
                                            <label class="custom-control-label" for="rememberMe">Đăng ký nhận thông tin từ chúng tôi</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="single-input-item mb-3">
                                <button class="btn obrien-button-2 primary-color">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('page-script')
@endsection