@extends('themes.members')

@section('page_title')
    Trang thông tin cá nhân
@endsection
@section('main-content')
    <div class="col-sm-9">
        <div class="acc-right">
            <h3 class="ch4_title text-uppercase">Thông tin liên hệ</h3>

            <form class="login-form" role="form" method="POST" action="{{ url('members/update') }}">
                {!! csrf_field() !!}
                <div class="form-group">
                    <label for="inputName" class="control-label">Email <b>*</b></label>
                    <input type="text" class="form-control" required value="{{$user->email}}" name="email">
                </div>
                <div class="form-group">
                    <label for="inputName" class="control-label">Di động <b>*</b></label>
                    <input type="text" class="form-control" required @if($profile!=null)value="{{$profile->phone}}"@endif name="phone">
                </div>
                <div class="form-group">
                    <label for="inputName" class="control-label">Mật Khẩu <b>*</b></label>
                    <div class="password-container clearfix">
                        <span class="password-encrypted">****************</span>
                        <div class="password-edit-button-container right">
                            <button class="password-edit-button ebtn" type="button" data-toggle="modal" data-target="#myModalChangepass">Đổi mật khẩu</button>
                        </div>
                    </div>

                </div>

                <div class="subNameForm">
                    <h3 class="mTitle">Thông tin riêng</h3>
                </div>

                <div class="form-group">
                    <label class="control-label">Ngày sinh <b>*</b></label>
                    <input type="text" class="form-control" required @if($profile!=null)value="{{$profile->birthday}}"@endif name="birthday">
                </div>


                    <div class="form-group">
                        <label for="inputName" class="control-label">Họ và tên<b>*</b></label>
                        <input type="text" class="form-control" required value="{{$user->full_name}}" name="full_name">
                    </div>


                <div class="subNameForm">
                    <h3 class="mTitle">Thông tin địa chỉ</h3>
                </div>
                <div class="form-group">
                    <label for="inputName" class="control-label">Địa chỉ <b>*</b></label>
                    <input type="text" class="form-control" required @if($profile!=null)value="{{$profile->address}}"@endif name="address">
                </div>

                <p class="sText sm2-padding"><span class="requiredColor">*</span>&nbsp;Thông tin bắt buộc</p>
                <div class="ch4_formButtonRow linebox">
                    <button class="ch4_btn ch4_btnBlack" type="reset">HỦY BỎ</button>
                    <button type="submit" class="ch4_btn ch4_btnOrange">LƯU LẠI</button>
                </div>
            </form>

        </div>
    </div><!-- /.col-sm  -->
  {{--  <div class="col-sm-3">
        <p class="font-bold font12">Hạng thành viên</p>
        <div class="img-member"><img src="assets/images/hang.png" class="imgresponsive" alt="Nike"></div>
    </div>--}}
@endsection
@section('page-script')
    <script src="{{ asset('themes/assets/vendors/validator/validator.js') }}"></script>
    <script type="text/javascript">
        $(document).on('ready', function() {
            $('#myform').validator()
        });
    </script>
@endsection