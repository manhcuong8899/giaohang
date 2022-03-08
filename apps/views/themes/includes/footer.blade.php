<div class="footer-widget-area">
    <div class="container container-default custom-area">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-custom d-none d-lg-block">
                <div class="single-footer-widget m-0">
                    <h2 class="widget-fanpage">HỆ THỐNG CUNG CẤP ĐẶC SẢN</h2>
                    <div class="fb-page" data-href="{{$settings['linkfanpage']}}" data-width="261" data-height="195" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="{{$settings['linkfanpage']}}" class="fb-xfbml-parse-ignore"><a href="{{$settings['linkfanpage']}}">CƠ KHÍ TUẤN HƯNG</a></blockquote></div>
                </div>
            </div>
            @if(array_key_exists("menuduoi",$menus))
                @foreach($menus['menuduoi'] as $key=>$value)
            <div class="col-12 col-sm-6 col-md-6 col-lg-2 col-custom">
                <div class="single-footer-widget">
                    <h2 class="widget-title">{{$value->name}}</h2>
                    @if($value->children->count()!=0)
                    <ul class="widget-list">
                        @foreach($value->children as $child)
                            <li><a href="{{url($child->link)}}">{{$child->name}}</a></li>
                        @endforeach
                    </ul>
                        @endif
                </div>
            </div>
                @endforeach
            @endif
            <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-custom">
                <div class="single-footer-widget">
                    <h2 class="widget-title">Thông tin liên hệ</h2>
                    <div class="widget-body">
                        <address>{{$settings['address']}}
                            <br>{{$settings['hotline']}}
                            <br>Email:{{$settings['email']}}
                            <br>Thời gian: {{$settings['time']}}</address>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
