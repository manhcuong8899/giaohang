@foreach($center as $gp)
<div class="container container-default custom-area">
    <div class="row">
        <div class="col-lg-5 m-auto text-center col-custom">
            <div class="section-content">
                <h2 class="title-1 text-uppercase">{{$gp->name}}</h2>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="product-wrapper col-lg-12 col-custom">
            <div class="row shop_wrapper grid_4">

                @foreach(viewProduct($gp->id) as $list)
                    <div class="col-lg-3 col-md-6 col-sm-6 col-custom product-area">
                    <div class="single-product position-relative mb-30">
                        <div class="product-image">
                            <a class="d-block" href="{{url($list->slug)}}">
                                <img src="{{asset('public/images/products/'.$list->code.'/'.$list->images)}}" alt="" class="product-image-1 w-100">
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
                                <span class="old-price"><del>{{number_format($list->listprice,'0',',','.')}}</del></span>
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
@endforeach