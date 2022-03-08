<div class="off-canvas-overlay"></div>
<div class="off-canvas-inner-content">
    <div class="btn-close-off-canvas">
        <i class="fa fa-times"></i>
    </div>
    <div class="off-canvas-inner">

        <div class="search-box-offcanvas">
            <form>
                <input type="text" placeholder="Search product...">
                <button class="search-btn"><i class="fa fa-search"></i></button>
            </form>
        </div>
        <!-- mobile menu start -->
        @if (array_key_exists("menutop",$menus))
        <div class="mobile-navigation">
            <!-- mobile menu navigation start -->
            <nav>
                <ul class="mobile-menu">
                    @foreach($menus['menutop'] as $key=>$value)
                    <li class="menu-item-has-children"><a href="{{url($value->link)}}">{{$value->name}}</a>
                        @if($value->children->count()!=0)
                            @if($value->megamenu==1)
                        <ul class="megamenu dropdown">
                            @foreach($value->children as $child)
                            <li class="mega-title has-children"><a href="#">{{ mb_strtoupper($child->name, 'UTF-8')}}</a>
                                <ul class="dropdown">
                                    @if($child->children->count()!=0)
                                        @foreach($child->children as $chil)
                                            <li><a href="{{url($chil->link)}}">{{$chil->name}}</a></li>
                                        @endforeach
                                    @endif
                                </ul>
                            </li>
                                @endforeach
                        </ul>
                            @else
                                <ul class="dropdown">
                                    @foreach($value->children as $child)
                                        <li><a href="{{$child->link}}">{{$child->name}}</a></li>
                                    @endforeach
                                </ul>
                            @endif
                        @endif
                    </li>
                    @endforeach
                </ul>
            </nav>
            <!-- mobile menu navigation end -->
        </div>
        @endif
        <!-- mobile menu end -->
        <div class="header-top-settings offcanvas-curreny-lang-support">
            <!-- mobile menu navigation start -->
            <nav>
                @if (Auth::guest())
                <ul class="mobile-menu">
                    <li class="menu-item-has-children"><a href="#">Quản lý tài khoản</a>
                        <ul class="dropdown">
                            <li><a href="{{url('members/login')}}">Đăng nhập</a></li>
                            <li><a href="{{url('members/register')}}">Đăng ký</a></li>
                        </ul>
                    </li>
                </ul>
                   @else
                    <ul class="mobile-menu">
                        <li class="menu-item-has-children"><a href="#">Quản lý tài khoản</a>
                            <ul class="dropdown">
                                <li><a href="{{url('/')}}">Thông tin tài khoản</a></li>
                                <li><a href="{{url('/')}}">Trang quản lý</a></li>
                                <li><a href="{{url('/')}}">Đổi mật khẩu</a></li>
                            </ul>
                        </li>
                    </ul>
                @endif
            </nav>
            <!-- mobile menu navigation end -->
        </div>
        <!-- offcanvas widget area start -->
        <div class="offcanvas-widget-area">
            <div class="top-info-wrap text-left text-black">
                <ul>
                    <li>
                        <i class="fa fa-phone"></i>
                        <a href="{{$settings['email']}}">Hotline: {{$settings['phone']}}</a>
                    </li>
                </ul>
            </div>
            <div class="off-canvas-widget-social">
                <a title="Facebook-f" href="{{$settings['linkfanpage']}}"><i class="fa fa-facebook-f"></i></a>
                <a title="Youtube" href="{{$settings['linkfanpage']}}"><i class="fa fa-youtube"></i></a>
            </div>
        </div>
        <!-- offcanvas widget area end -->
    </div>
</div>