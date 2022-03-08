@extends('themes.cart')

@section('page_title')

@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3">CHI TIẾT GIỎ HÀNG</h3>
                        <ul>
                            <li><a href="#">Giỏ hàng sản phẩm </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('themes.includes.flash')
    <!-- cart main wrapper start -->
    <div class="cart-main-wrapper mt-no-text mb-no-text">
        <div class="container container-default-2 custom-area">
            <div class="row">
                <div class="col-lg-12">
                    <!-- Cart Table Area -->
                    <div class="cart-table table-responsive">
                        <form id="FormUpdateCart" action="{{ url('cart/updateall')}}" class=" d-block d-md-flex" method="POST" enctype="multipart/form-data">
                            {!! csrf_field() !!}
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th class="pro-thumbnail">Hình ảnh</th>
                                <th class="pro-title">Sản phẩm</th>
                                <th class="pro-price">Đơn giá</th>
                                <th class="pro-quantity">Số lượng</th>
                                <th class="pro-subtotal">Thành tiền</th>
                                <th class="pro-remove">Hủy mua</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($cart as $index=>$acart)
                            <tr>
                                <td class="pro-thumbnail"><a href="#"><img class="img-fluid" src="{{asset('public/images/products/'.$acart->options->code.'/'.$acart->options->images)}}" alt="Product" /></a></td>
                                <td class="pro-title"><a href="#">{{$acart->name}}</a></td>
                                <td class="pro-price"><span>{{number_format($acart->price,'0',',','.')}}</span>
                                </td>
                                <td class="pro-quantity">
                                    <div class="quantity">
                                        <div class="cart-plus-minus">
                                            <input class="cart-plus-minus-box" value="{{$acart->qty}}" type="text" name="{{'qty['.$index.']'}}" id="qty">
                                            <div class="dec qtybutton">-</div>
                                            <div class="inc qtybutton">+</div>
                                            <div class="dec qtybutton"><i class="fa fa-minus"></i></div>
                                            <div class="inc qtybutton"><i class="fa fa-plus"></i></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="pro-subtotal"><span>{{number_format($acart->price*$acart->qty,'0',',','.')}}</span>
                                    @if(\Illuminate\Support\Facades\Session::has('counpons'))
                                        <br>
                                        <span style="font-size: 10px;">Giảm giá: <font style="color: #ff2222">{{number_format($acart->options->coupons,'0',',','.')}}</font></span>
                                    @endif
                                </td>
                                <td class="pro-remove"><a  class="ch4_btn" onclick="delRowProduct('{{$acart->id}}','{{$index}}');"><i class="ion-trash-b"></i></a></td>
                            </tr>
                            @endforeach
                            </tbody>
                        </table>
                        </form>

                    </div>
                    <!-- Cart Update Option -->
                    <div class="cart-update-option d-block d-md-flex justify-content-between">
                        @if(\Illuminate\Support\Facades\Session::has('counpons'))
                        <div class="apply-coupon-wrapper">
                            <span>
                              <input type="text" name="coupon" id="coupon" placeholder="{{\Illuminate\Support\Facades\Session::get('counpons')[0]['code']}}" name="coupon" disabled />
                                <button id="btncancercoupon" class="btn obrien-button primary-btn">Hủy sử dụng mã</button>
                            </span>

                        </div>
                        @else
                            <div class="apply-coupon-wrapper">
                            <span>
                              <input type="text" name="coupon" id="coupon" placeholder="Điền mã giảm giá" required />
                                <button id="btncoupon" class="btn obrien-button primary-btn">Xác nhận mã</button>
                            </span>

                            </div>
                            @endif
                        <div class="cart-update mt-sm-16">
                            <button class="btn obrien-button primary-btn" onclick="updateAllCart()" type="submit">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-5 ml-auto">
                    <!-- Cart Calculation Area -->
                    <div class="cart-calculator-wrapper">
                        <div class="cart-calculate-items">
                            <h3>Hóa đơn thành toán (Chưa bao gồm VAT)</h3>
                            <div class="table-responsive">
                                <table class="table">
                                    <tr>
                                        <td>Thành tiền</td>
                                        <td>{{number_format($total,'0',',','.')}}</td>
                                    </tr>
                                    <tr>
                                        <td>Giảm giá theo mã</td>
                                        <td>{{number_format($coupons,'0',',','.')}}</td>
                                    </tr>
                                    <tr class="total">
                                        <td>Tổng thanh toán</td>
                                        <td class="total-amount">{{number_format($total-$coupons,'0',',','.')}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <a href="{{url('checkout')}}" class="btn obrien-button primary-btn d-block">Tiếp tục Thanh toán</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- cart main wrapper end -->
@endsection
@section('page-script')
<script>
        function updateRowProduct(id,rowid){
            var quantity = $('input[name=newquantity'+id+']').val();
            $.ajax({
                url: '{{url('cart/updateitem')}}',
                dataType: "json",
                type: "post",
                data: {_method: 'post', _token: '{{csrf_token()}}', rowId: rowid, newquantity: quantity}
            }).done(function(data) {
                window.location.href = data;
            }).fail(function(data) {
                alert('Xảy ra lỗi update sản phẩm trong giỏ hàng!!');
            });
        }

        function updateAllCart(){
            document.getElementById('FormUpdateCart').submit();
        }


        /* Get Coupon*/
        $('#btncoupon').click(function(){
            var code = $('input[name=coupon]').val();
            var url = '{{url('cart')}}'
            $.ajax({
                url: '{{url('coupons')}}',
                dataType: "html",
                type: "post",
                data: {_method: 'post', _token: '{{csrf_token()}}', code: code}
            }).done(function(data){
                if(data=='true'){
                    window.location.href = url;
                }else{
                    alert('Mã giảm giá không chính xác!');
                }
            }).fail(function(data) {
                alert('Xảy ra lỗi!!');
            });
        });
        /* Get Coupon*/
        $('#btncancercoupon').click(function(){
            $.ajax({
                url: '{{url('cancercoupons')}}',
                dataType: "html",
                type: "post",
                data: {_method: 'post', _token: '{{csrf_token()}}'}
            }).done(function(data){
                window.location.href = data;
            }).fail(function(data) {
                alert('Xảy ra lỗi!!');
            });
        });
</script>
@endsection