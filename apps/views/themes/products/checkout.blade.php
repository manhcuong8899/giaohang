@extends('themes.checkout')

@section('page_title')

@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3">XÁC NHẬN THANH TOÁN</h3>
                        <ul>
                            <li><a href="#">Xác nhận thanh toán</a></li>
                            <li>Hóa đơn</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
        @include('themes.includes.flash')
    <!-- Checkout Area Start Here -->
    <div class="checkout-area">
        <div class="container container-default-2 custom-container">
            <form action="{{url('order')}}" method="POST" id="myform">
                {!! csrf_field() !!}
            <div class="row">
                <div class="col-lg-6 col-12">
                        <div class="checkbox-form">
                            <h3>THÔNG TIN ĐẶT HÀNG</h3>

                            @if (Auth::guest())
                                @include('themes.includes.formcheckout')
                            @else
                                @include('themes.includes.membercheckout')
                            @endif

                            <div class="different-address">
                                <div class="ship-different-title">
                                    <div>
                                        <input id="ship-box" type="checkbox" name="shipbox">
                                        <label for="ship-box">Thông tin người nhận hàng khác?</label>
                                    </div>
                                </div>
                                <div id="ship-box-info" class="row mt-2">
                                    <div class="col-md-12">
                                        <div class="myniceselect country-select clearfix">
                                            <label>Tỉnh/Thành Phố <span class="required redform">*</span></label>
                                            <select class="form-control select2-dropdown" name="city" id="city">
                                                <option>Thành phố/Tỉnh</option>
                                                <option value="SG">Hồ Chí Minh</option>
                                                <option value="HN">Hà Nội</option>
                                                <option value="DDN">Đà Nẵng</option>
                                                <option value="BD">Bình Dương</option>
                                                <option value="DNA">Đồng Nai</option>
                                                <option value="KH">Khánh Hòa</option>
                                                <option value="HP">Hải Phòng</option>
                                                <option value="LA">Long An</option>
                                                <option value="QNA">Quảng Nam</option>
                                                <option value="VT">Bà Rịa Vũng Tàu</option>
                                                <option value="DDL">Đắk Lắk</option>
                                                <option value="CT">Cần Thơ</option>
                                                <option value="BTH">Bình Thuận  </option>
                                                <option value="LDD">Lâm Đồng</option>
                                                <option value="TTH">Thừa Thiên Huế</option>
                                                <option value="KG">Kiên Giang</option>
                                                <option value="BN">Bắc Ninh</option>
                                                <option value="QNI">Quảng Ninh</option>
                                                <option value="TH">Thanh Hóa</option>
                                                <option value="NA">Nghệ An</option>
                                                <option value="HD">Hải Dương</option>
                                                <option value="GL">Gia Lai</option>
                                                <option value="BP">Bình Phước</option>
                                                <option value="HY">Hưng Yên</option>
                                                <option value="BDD">Bình Định</option>
                                                <option value="TG">Tiền Giang</option>
                                                <option value="TB">Thái Bình</option>
                                                <option value="BG">Bắc Giang</option>
                                                <option value="HB">Hòa Bình</option>
                                                <option value="AG">An Giang</option>
                                                <option value="VP">Vĩnh Phúc</option>
                                                <option value="TNI">Tây Ninh</option>
                                                <option value="TN">Thái Nguyên</option>
                                                <option value="LCA">Lào Cai</option>
                                                <option value="NDD">Nam Định</option>
                                                <option value="QNG">Quảng Ngãi</option>
                                                <option value="BTR">Bến Tre</option>
                                                <option value="DNO">Đắk Nông</option>
                                                <option value="CM">Cà Mau</option>
                                                <option value="VL">Vĩnh Long</option>
                                                <option value="NB">Ninh Bình</option>
                                                <option value="PT">Phú Thọ</option>
                                                <option value="NT">Ninh Thuận</option>
                                                <option value="PY">Phú Yên</option>
                                                <option value="HNA">Hà Nam</option>
                                                <option value="HT">Hà Tĩnh</option>
                                                <option value="DDT">Đồng Tháp</option>
                                                <option value="ST">Sóc Trăng</option>
                                                <option value="KT">Kon Tum</option>
                                                <option value="QB">Quảng Bình</option>
                                                <option value="QT">Quảng Trị</option>
                                                <option value="TV">Trà Vinh</option>
                                                <option value="HGI">Hậu Giang</option>
                                                <option value="SL">Sơn La</option>
                                                <option value="BL">Bạc Liêu</option>
                                                <option value="YB">Yên Bái</option>
                                                <option value="TQ">Tuyên Quang</option>
                                                <option value="DDB">Điện Biên</option>
                                                <option value="LCH">Lai Châu</option>
                                                <option value="LS">Lạng Sơn</option>
                                                <option value="HG">Hà Giang</option>
                                                <option value="BK">Bắc Kạn</option>
                                                <option value="CB">Cao Bằng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Họ và tên <span class="required redform">*</span></label>
                                            <input placeholder="Nhập Họ và Tên" type="text" name="ship_full_name">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Địa chỉ<span class="required redform">*</span></label>
                                            <input placeholder="Địa chỉ" type="text" name="ship_address" id="address">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Điện thoại<span class="required redform">*</span></label>
                                            <input placeholder="Điện thoại" type="text" name="ship_phone" id="ship_phone">
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Email<span class="required redform">*</span></label>
                                            <input placeholder=" Địa chỉ email" type="email" name="ship_email" id="ship_email">
                                        </div>
                                    </div>
                                </div>
                                <div class="order-notes mt-3">
                                    <div class="checkout-form-list checkout-form-list-2">
                                        <label>Ghi chú</label>
                                        <textarea id="checkout-mess" cols="30" rows="10" placeholder="Nhập ghi chú cho đơn hàng. Để chúng tôi đảm bảo đáp ứng yêu cầu của quý khách hàng" name="note"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="your-order">
                        <h3>HÓA ĐƠN</h3>
                        <div class="your-order-table table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th class="cart-product-name">Sản phẩm</th>
                                    <th class="cart-product-total">Thành tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($cart as $index=>$acart)
                                <tr class="cart_item">
                                    <td class="cart-product-name"> {{$acart->name}}<strong class="product-quantity">
                                            × {{$acart->qty}}</strong></td>
                                    <td class="cart-product-total text-center"><span class="amount">{{number_format($acart->price,'0',',','.')}}</span></td>
                                </tr>
                                @endforeach
                                </tbody>
                                <tfoot>
                                <tr class="cart-subtotal">
                                    <th>Tổng đơn hàng</th>
                                    <td class="text-center"><span class="amount">{{number_format($total,'0',',','.')}}</span></td>
                                </tr>
                                <tr class="cart-subtotal">
                                    <th>Giảm giá theo mã</th>
                                    <td class="text-center"><span class="amount">{{number_format($coupons,'0',',','.')}}</span></td>
                                </tr>
                                <tr class="cart-subtotal">
                                    <th>Thành tiền <span style="font-size: 12px"></span></th>
                                    <td class="text-center"><strong><span class="amount" style="color: blue">{{number_format($total-$coupons,'0',',','.')}}</span> vnđ</strong></td>
                                </tr>
                                @if(isset($kmgiamgia))
                                <tr class="cart-subtotal">
                                    <th>{{$kmgiamgia->name}}<span style="font-size: 12px"></span></th>
                                    <td class="text-center"><span class="amount" style="color: black">{{number_format($kmgiamgia->options->value,'0',',','.')}}</span> vnđ</td>
                                </tr>
                                @endif
                                @if(isset($kmgiamgia))
                                <tr class="order-total">
                                    <th>Tổng thanh toán <span style="font-size: 12px">(Chưa bao gồm VAT)</span></th>
                                    <td class="text-center"><strong><span class="amount" style="color: red">{{number_format($total-$coupons-$kmgiamgia->options->value,'0',',','.')}}</span> vnđ</strong></td>
                                </tr>
                                    @else
                                    <tr class="order-total">
                                        <th>Tổng thanh toán <span style="font-size: 12px">(Chưa bao gồm VAT)</span></th>
                                        <td class="text-center"><strong><span class="amount" style="color: red">{{number_format($total-$coupons,'0',',','.')}}</span> vnđ</strong></td>
                                    </tr>
                                @endif
                                </tfoot>
                            </table>
                        </div>
                        <div class="payment-method">
                            <div class="payment-accordion">
                                <div id="accordion">
                                    <div class="card">
                                        <div class="card-header" id="#payment-1">
                                            <h5 class="panel-title mb-2">
                                                <a href="#" class="" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                   Hình thức thanh toán
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse show" data-parent="#accordion">
                                            <div class="card-body mb-2 mt-2">
                                                <p> Quý khách có thể thực hiện thanh toán bằng 02 hình thức sau:
                                                    <br>1. Tiền mặt: Thanh toán trực tiếp khi giao hàng
                                                    <br>2. Thanh toán chuyển khoản trước khi nhận hàng hoặc khi giao hàng được nhân viên của chúng tôi xác nhận</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="#payment-2">
                                            <h5 class="panel-title mb-2">
                                                <a href="#" class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                  Hướng dẫn chuyển khoản
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" class="collapse" data-parent="#accordion">
                                            <div class="card-body mb-2 mt-2">
                                                <p>Vui lòng kiểm tra email lấy mã ID đơn đặt hàng của quý khách và sử dụng ghi nội dung thanh toán theo cú pháp <b style="color: #eca915">THANH TOAN MA DON + ID</b></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="#payment-3">
                                            <h5 class="panel-title mb-2">
                                                <a href="#" class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                 Thông tin chuyển khoản
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" data-parent="#accordion">
                                            @foreach($banks as $key=>$bank)
                                                    <div class="col-lg-9 col-12">
                                                        <ul>
                                                            <li><span style="font-weight: bold;color:#234922">{{$key+1}}. {{$bank->cates->name}}</span></li>
                                                            <li>    Chủ tài khoản: {{$bank->accountbank}}</li>
                                                            <li>    Số tài khoản: {{$bank->banknumber}}</li>
                                                            <li>    Chi nhánh: {{$bank->branch}}</li>
                                                        </ul>
                                                    </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                                <div class="order-button-payment">
                                    <input value="XÁC NHẬN THANH TOÁN" type="submit">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
    <!-- Checkout Area End Here -->

@endsection
@section('page-script')
@endsection