@extends('themes.products')
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
    <!-- Shop Main Area Start Here -->
    <div class="shop-main-area">
        <div class="container container-default custom-area">
            <div class="row flex-row-reverse">
                <div class="col-lg-9 col-12 col-custom widget-mt">
                    <!--shop toolbar start-->
                    <div class="shop_toolbar_wrapper">
                        <div class="shop_toolbar_btn">
                            <button data-role="grid_3" type="button" class="active btn-grid-3" data-toggle="tooltip" title="3"><i class="fa fa-th"></i></button>
                            <!-- <button data-role="grid_4" type="button"  class=" btn-grid-4" data-toggle="tooltip" title="4"></button> -->
                            <button data-role="grid_list" type="button" class="btn-list" data-toggle="tooltip" title="List"><i class="fa fa-th-list"></i></button>
                        </div>
                    </div>
                    <!--shop toolbar end-->
                    <!-- Shop Wrapper Start -->

                    <div class="row shop_wrapper grid_3">
                        @foreach($listproducts as $value)
                        <div class="col-md-6 col-sm-6 col-lg-4 col-custom product-area">
                            <div class="single-product position-relative">
                                <div class="product-image">
                                    <a class="d-block" href="{{url($value->slug)}}">
                                        <img src="{{asset('public/images/products/'.$value->code.'/'.$value->images)}}" alt="{{$value->name}}" class="product-image-1 w-100">
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
                                        <h4 class="title-2"> <a href="{{url($value->slug)}}">{{$value->name}}</a></h4>
                                    </div>
                                    <div class="price-box">
                                        <span class="regular-price ">{{number_format($value->price,'0',',','.')}}</span>
                                        <span class="old-price"><del>{{number_format($value->listprice,'0',',','.')}}</del></span>
                                    </div>
                                </div>
                                <div class="add-action d-flex position-absolute">
                                    <a title="Thêm vào giỏ hàng" onclick="addcart('{{ url('ajax/addcart/'.$value->id) }}')"> <i  class="ion-bag"></i></a>
                                    <a title="Xem nhanh" onclick="viewproduct('{{ url('ajax/viewproduct/'.$value->id) }}')">  <i class="ion-eye"></i></a>
                                </div>
                                <div class="product-content-listview">
                                    <div class="product-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                    <div class="product-title">
                                        <h4 class="title-2"> <a href="{{$value->slug}}">{{$value->name}}</a></h4>
                                    </div>
                                    <div class="price-box">
                                        <span class="regular-price ">{{number_format($value->price,'0',',','.')}}</span>
                                        <span class="old-price"><del>{{number_format($value->listprice,'0',',','.')}}</del></span>
                                    </div>
                                    <div class="add-action-listview d-flex">
                                        <a title="Thêm vào giỏ hàng" onclick="addcart('{{ url('ajax/addcart/'.$value->id) }}')"> <i  class="ion-bag"></i></a>
                                        <a title="Xem nhanh" onclick="viewproduct('{{ url('ajax/viewproduct/'.$value->id) }}')">  <i class="ion-eye"></i></a>
                                    </div>
                                    <p class="desc-content">
                                        {!! $value->short !!}
                                    </p>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>

                    <!-- Shop Wrapper End -->
                    <!-- Bottom Toolbar Start -->
                    <div class="row">
                        <div class="col-sm-12 col-custom">
                            <div class="toolbar-bottom mt-30">
                                <nav class="pagination pagination-wrap mb-10 mb-sm-0">
                                    <ul class="pagination">
                                        {!! $listproducts->render() !!}
                                    </ul>
                                </nav>
                                <p class="desc-content text-center text-sm-right">Hiển 1 - 18 trên tổng số {{$totalproduct}} sản phẩm</p>
                            </div>
                        </div>
                    </div>
                    <!-- Bottom Toolbar End -->
                </div>
                <div class="col-lg-3 col-12 col-custom">
                    <!-- Sidebar Widget Start -->
                 @include('themes.includes.sidebar_product')
                    <!-- Sidebar Widget End -->
                </div>
            </div>
        </div>
    </div>
@endsection
@section('page-script')
@endsection