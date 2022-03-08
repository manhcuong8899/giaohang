@extends('themes.checkout')

@section('page_title')
@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3">ĐẶT  HÀNG THÀNH CÔNG</h3>
                        <ul>
                            <li><a href="#">Đặt hàng thành công</a></li>
                            <li>Hóa đơn</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('themes.includes.flash')
@endsection
@section('page-script')
@endsection