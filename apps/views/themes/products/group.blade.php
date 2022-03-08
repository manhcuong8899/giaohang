@extends('themes.groups')
@section('page_title')
Trang chủ
@endsection
@section('main-content')
    <div class="list-col-right">
        <div class="list-products">
            <h2>{{$viewgroup->name}}<span></span></h2>
            <div class="row">
@foreach(viewProduct($viewgroup->id) as $key=>$list)
                <div class="col-5">
                    <div class="grid-item hot-product">
                        <div class="item-box">
                            <div class="cover"><a href="{{url($list->slug)}}"><img src="{{asset('public/images/products/'.$list->model.'/'.$list->images)}}" alt="{{$list->name}}" class="imgresponsive"></a></div>
                            <div class="info-product">
                                <div class="info-color">
                                    <div class="number-of-colors">{{\VNPCMS\Products\Products::colors($list->name)}} Màu</div>
                                </div>
                                <div class="info-view-color">
                                    <div class="multi-item-carousel carousel slide"  data-interval="false" id="inner-product-{{$list->id}}">
                                        <div class="carousel-inner">
                                            @foreach(\VNPCMS\Products\Products::Models($list->name) as $key=>$model)
                                            <div class="item @if($key==0)active @endif">
                                                <div class="col-lg-4 col-xs-4 col-md-4 col-sm-4">
                                                    <a href="{{url($model->slug)}}" data-img-big="{{asset('public/images/products/'.$model->model.'/'.$model->images)}}"><img src="{{asset('public/images/products/'.$model->model.'/'.$model->images)}}" class="img-responsive"></a></div>
                                            </div>
                                            @endforeach
                                        </div>
                                        <a class="left carousel-control" href="#inner-product-{{$list->id}}" data-slide="prev">
                                            <i class="fa fa-chevron-left"></i>
                                        </a>
                                        <a class="right carousel-control" href="#inner-product-{{$list->id}}" data-slide="next">
                                            <i class="fa fa-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <h3><a href="{{url($list->slug)}}">{{$list->name}}</a></h3>
                                <div class="product-subtitle">{{$list->cates->parent->name}}-{{$list->cates->name}}</div>
                                <div class="price"><span>{{number_format($list->price,'0',',','.')}}</span>@if($list->listprice!=0)<span class="old">{{number_format($list->listprice,'0',',','.')}}</span>@endif</div>
                                @if($list->listprice!=0)<div class="hot-percent">-{{round(100-($list->price/$list->listprice)*100,0)}}%</div>@endif
                            </div>
                        </div>
                    </div>
                </div>
@endforeach




            </div>
        </div>
    </div><!-- /.list-col-right -->
@endsection
@section('page-script')
@endsection