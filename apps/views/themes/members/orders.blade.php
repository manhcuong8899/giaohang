@extends('themes.members')

@section('page_title')
    Lịch sử giao dịch
@endsection
@section('main-content')
    <div class="col-sm-9">
        <div class="acc-right">
            <h3 class="acc_title">Lịch sử giao dịch</h3>
            <ul class="nav nav-tabs acc-order-nav" role="tablist">
                <li class="active"><a href="#tab-completed" data-toggle="tab">Đã giao hàng</a></li>
                <li><a href="#tab-waitfordelivery" data-toggle="tab">Chưa giao hàng</a></li>
                <li><a href="#tab-unpaid" data-toggle="tab">Chưa thanh toán</a></li>
                <li><a href="#tab-needconfirmation" data-toggle="tab">Chưa đặt cọc</a></li>
            </ul>

            {{--<div class="acc-show-select">
                <select class="style-form">
                    <option>Trong vòng 30 ngày</option>
                    <option>Trong vòng 60 ngày</option>
                    <option>Trong vòng 90 ngày</option>
                </select>
            </div>--}}

            <div class="tab-content">
                <div class="tab-pane active" id="tab-completed">
                    <div class="acc-list-orders">
                        @foreach($complete as $key=>$list)
                        <div class="item">
                            <div class="acc-head-info">
                                <span>Thời gian: {{date($list->created_at)}}</span>

                                <span>Số lượng: {{$list->detail->count()}}</span>
                                <span>Tổng chi phí: {{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                <div class="text-right btn-details">
                                    <a href="#">Chi tiêt</a>
                                </div>
                            </div>
                            <div class="summaryInfo">
                                <table>
                                    <tr>
                                        <th>Mã đơn hàng</th>
                                        <th width="100">Địa chỉ</th>
                                        <th>Thanh toán</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                    <tr>
                                        <td>{{$list->code}}</td>
                                        <td>{{$list->address}}</td>
                                        <td>{{$list->typeCard}}</td>
                                        <td>
                                            <p>Tổng giá sản phẩm: {{number_format($list->total,0,',','.')}}đ</p>
                                            <p>Giảm trù: {{number_format($list->discount,0,',','.')}}đ</p>
                                            <p>Vận chuyển: {{number_format($list->freight,0,',','.')}}đ</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div class="summary-table-total">
                                                <span class="font-bold">Tổng chi phí:</span>
                                                <span class="font-bold color-main">{{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="summaryList">
                                <div class="ship">Đã giao hàng</div>
                                @foreach($list->detail as $detail)
                                <div class="cartItem">
                                    <div class="summaryItemImg"><img src="{{asset('public/images/products/'.$detail->product->model.'/'.$detail->product->images)}}" class="imgresponsive"></div>
                                    <div class="summaryItemContent">
                                        <h4 class="summaryItemTitle">{{$detail->product->name}}</h4>
                                        <div class="price">{{number_format($detail->price*$detail->quantity,0,',','.')}}đ</div>
                                        <p class="ch4_cartItemOptions">
                                            <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Số lượng</span>:{{$detail->quantity}}</span>
                                            <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Màu sắc</span>: {{$detail->color}}</span>
                                            <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Size</span>: {{$detail->size}}</span>
                                        </p>
                                    </div>
                                </div>
                                @endforeach

                            </div>
                        </div>
                        @endforeach


                    </div><!-- /.acc-list-orders  -->

                </div><!--/.tab 1-->
                <div class="tab-pane" id="tab-waitfordelivery">
                    <div class="acc-list-orders">
                        @foreach($wait as $key=>$list)
                            <div class="item">
                                <div class="acc-head-info">
                                    <span>Thời gian: {{date($list->created_at)}}</span>

                                    <span>Số lượng: {{$list->detail->count()}}</span>
                                    <span>Tổng chi phí: {{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                    <div class="text-right btn-details">
                                        <a href="#">Chi tiêt</a>
                                    </div>
                                </div>
                                <div class="summaryInfo">
                                    <table>
                                        <tr>
                                            <th>Mã đơn hàng</th>
                                            <th width="100">Địa chỉ</th>
                                            <th>Thanh toán</th>
                                            <th>Chi tiết</th>
                                        </tr>
                                        <tr>
                                            <td>{{$list->code}}</td>
                                            <td>{{$list->address}}</td>
                                            <td>{{$list->typeCard}}</td>
                                            <td>
                                                <p>Tổng giá sản phẩm: {{number_format($list->total,0,',','.')}}đ</p>
                                                <p>Giảm trù: {{number_format($list->discount,0,',','.')}}đ</p>
                                                <p>Vận chuyển: {{number_format($list->freight,0,',','.')}}đ</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div class="summary-table-total">
                                                    <span class="font-bold">Tổng chi phí:</span>
                                                    <span class="font-bold color-main">{{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="summaryList">
                                    <div class="ship">Chờ giao hàng</div>
                                    @foreach($list->detail as $detail)
                                        <div class="cartItem">
                                          @if($detail->product!=null)
                                            <div class="summaryItemImg"><img src="{{asset('public/images/products/'.$detail->product->model.'/'.$detail->product->images)}}" class="imgresponsive"></div>
                                              <div class="summaryItemContent">
                                                <h4 class="summaryItemTitle">{{$detail->product->name}}</h4>
                                                <div class="price">{{number_format($detail->price*$detail->quantity,0,',','.')}}đ</div>
                                                <p class="ch4_cartItemOptions">
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Số lượng</span>:{{$detail->quantity}}</span>
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Màu sắc</span>: {{$detail->color}}</span>
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Size</span>: {{$detail->size}}</span>
                                                </p>
                                            </div>
                                            @endif
                                        </div>
                                    @endforeach

                                </div>
                            </div>
                        @endforeach


                    </div><!-- /.acc-list-orders  -->
                </div><!--/.tab 2-->
                <div class="tab-pane" id="tab-needconfirmation">
                    <div class="acc-list-orders">
                        @foreach($needconfirm as $key=>$list)
                            <div class="item">
                                <div class="acc-head-info">
                                    <span>Thời gian: {{date($list->created_at)}}</span>

                                    <span>Số lượng: {{$list->detail->count()}}</span>
                                    <span>Tổng chi phí: {{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                    <div class="text-right btn-details">
                                        <a href="#">Chi tiêt</a>
                                    </div>
                                </div>
                                <div class="summaryInfo">
                                    <table>
                                        <tr>
                                            <th>Mã đơn hàng</th>
                                            <th width="100">Địa chỉ</th>
                                            <th>Thanh toán</th>
                                            <th>Chi tiết</th>
                                        </tr>
                                        <tr>
                                            <td>{{$list->code}}</td>
                                            <td>{{$list->address}}</td>
                                            <td>{{$list->typeCard}}</td>
                                            <td>
                                                <p>Tổng giá sản phẩm: {{number_format($list->total,0,',','.')}}đ</p>
                                                <p>Giảm trù: {{number_format($list->discount,0,',','.')}}đ</p>
                                                <p>Vận chuyển: {{number_format($list->freight,0,',','.')}}đ</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div class="summary-table-total">
                                                    <span class="font-bold">Tổng chi phí:</span>
                                                    <span class="font-bold color-main">{{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="summaryList">
                                    <div class="ship">Cần xác nhận lại thông tin</div>
                                    @foreach($list->detail as $detail)
                                        <div class="cartItem">
                                            <div class="summaryItemImg"><img src="{{asset('public/images/products/'.$detail->product->model.'/'.$detail->product->images)}}" class="imgresponsive"></div>
                                            <div class="summaryItemContent">
                                                <h4 class="summaryItemTitle">{{$detail->product->name}}</h4>
                                                <div class="price">{{number_format($detail->price*$detail->quantity,0,',','.')}}đ</div>
                                                <p class="ch4_cartItemOptions">
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Số lượng</span>:{{$detail->quantity}}</span>
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Màu sắc</span>: {{$detail->color}}</span>
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Size</span>: {{$detail->size}}</span>
                                                </p>
                                            </div>
                                        </div>
                                    @endforeach

                                </div>
                            </div>
                        @endforeach


                    </div><!-- /.acc-list-orders  -->
                </div><!--/.tab 3-->

                <div class="tab-pane" id="tab-cancel">
                    <div class="acc-list-orders">
                        @foreach($unpaid as $key=>$list)
                            <div class="item">
                                <div class="acc-head-info">
                                    <span>Thời gian: {{date($list->created_at)}}</span>

                                    <span>Số lượng: {{$list->detail->count()}}</span>
                                    <span>Tổng chi phí: {{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                    <div class="text-right btn-details">
                                        <a href="#">Chi tiêt</a>
                                    </div>
                                </div>
                                <div class="summaryInfo">
                                    <table>
                                        <tr>
                                            <th>Mã đơn hàng</th>
                                            <th width="100">Địa chỉ</th>
                                            <th>Thanh toán</th>
                                            <th>Chi tiết</th>
                                        </tr>
                                        <tr>
                                            <td>{{$list->code}}</td>
                                            <td>{{$list->address}}</td>
                                            <td>{{$list->typeCard}}</td>
                                            <td>
                                                <p>Tổng giá sản phẩm: {{number_format($list->total,0,',','.')}}đ</p>
                                                <p>Giảm trù: {{number_format($list->discount,0,',','.')}}đ</p>
                                                <p>Vận chuyển: {{number_format($list->freight,0,',','.')}}đ</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div class="summary-table-total">
                                                    <span class="font-bold">Tổng chi phí:</span>
                                                    <span class="font-bold color-main">{{number_format($list->total+$list->freight-$list->discount,0,',','.')}}đ</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="summaryList">
                                    <div class="ship">Chưa thanh toán</div>
                                    @foreach($list->detail as $detail)
                                        <div class="cartItem">
                                            @if($detail->product!=null)
                                            <div class="summaryItemImg"><img src="{{asset('public/images/products/'.$detail->product->model.'/'.$detail->product->images)}}" class="imgresponsive"></div>
                                            <div class="summaryItemContent">
                                                <h4 class="summaryItemTitle">{{$detail->product->name}}</h4>
                                                <div class="price">{{number_format($detail->price*$detail->quantity,0,',','.')}}đ</div>
                                                <p class="ch4_cartItemOptions">
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Số lượng</span>:{{$detail->quantity}}</span>
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Màu sắc</span>: {{$detail->color}}</span>
                                                    <span class="ch4_cartItemOption"><span class="ch4_cartItemLabel">Size</span>: {{$detail->size}}</span>
                                                </p>
                                            </div>
                                                @endif
                                        </div>
                                    @endforeach

                                </div>
                            </div>
                        @endforeach


                    </div><!-- /.acc-list-orders  -->
                </div><!--/.tab 4-->
            </div>
        </div>
    </div><!-- /.col-sm  -->
@endsection
@section('page-script')
    <script type="text/javascript">
        $(document).on('ready', function() {
            $('.btn-details').click(function(){
                if($(this).hasClass('opened')){

                    $(this).removeClass('opened');
                }else{
                    $(this).addClass('opened');
                }

                var summaryInfo = $(this).closest('.item').find('.summaryInfo').slideToggle();
            });
        });
    </script>
@endsection