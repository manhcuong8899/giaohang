<ul class="nav">
    @if (Auth::guest())
    <li class="login-register-wrap d-none d-xl-flex">
        <span><a href="{{url('members/login')}}">Đăng nhập</a></span>
        <span><a href="{{url('members/register')}}">Đăng ký</a></span>
    </li>
    @else
        <li class="minicart-wrap d-none d-lg-block">
            <a href="#" class="pageuser-btn toolbar-btn " title="Truy cập trang quản lý"> <i class="ion-person"></i></a>
        </li>
        <li class="minicart-wrap d-none d-lg-block">
            <a href="{{url('admin/logout')}}" class="pageuser-btn toolbar-btn" title="Thoát"> <i class="ion-log-out"></i></a>
        </li>
        @endif
    <li class="minicart-wrap">
        <a href="#" class="minicart-btn toolbar-btn">
            <i class="ion-bag"></i>
            <span class="cart-item_count">{{Cart::instance('cart')->content()->count()}}</span>
        </a>
        <div class="cart-item-wrapper dropdown-sidemenu dropdown-hover-2">
            @foreach(Cart::instance('cart')->content() as $index=>$acart)
            <div class="single-cart-item">
                <div class="cart-img">
                    <a href="{{url('cart')}}"><img src="{{asset('public/images/products/'.$acart->options->code.'/'.$acart->options->images)}}" alt="{{$acart->name}}"></a>
                </div>
                <div class="cart-text">
                    <h5 class="title"><a href="{{url('cart')}}">{{$acart->name}}</a></h5>
                    <div class="cart-text-btn">
                        <div class="cart-qty">
                            <span>{{$acart->qty}}×</span>
                            <span class="cart-price">{{number_format($acart->price,'0',',','.')}}</span>
                        </div>
                        <button id="{{$acart->id}}" class="ch4_btn" onclick="delRowProduct(this.id,this.value);" value="{{$index}}"><i class="ion-trash-b"></i></button>
                    </div>
                </div>
            </div>

            @endforeach
            <div class="cart-price-total d-flex justify-content-between">
                <h5>Tổng chi phí (chưa VAT) :</h5>
                <h5>{{number_format(getTotal(Cart::instance('cart')->content()),'0',',','.')}}</h5>
            </div>
            <div class="cart-links d-flex justify-content-center">
                <a class="obrien-button white-btn" href="{{url('cart')}}">Kiểm tra Giỏ hàng</a>
            </div>
        </div>
    </li>
    <li class="mobile-menu-btn d-lg-none">
        <a class="off-canvas-btn" href="#">
            <i class="fa fa-bars"></i>
        </a>
    </li>
</ul>