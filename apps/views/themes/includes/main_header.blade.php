<div class="container container-default custom-area">
    <div class="row">
        <div class="col-lg-12 col-custom">
            <div class="row align-items-center">
                <div class="col-lg-2 col-xl-2 col-sm-6 col-6 col-custom">
                    <div class="header-logo d-flex align-items-center">
                        <a href="/">
                            <img class="img-full" src="{{url('public/images/logo/'.$settings['images'])}}" alt="{{$settings['titlehomepage']}}">
                        </a>
                    </div>
                </div>
                <div class="col-lg-8 col-xl-7 position-static d-none d-lg-block col-custom">
                    <nav class="main-nav d-flex justify-content-center">
                        @if (array_key_exists("menutop",$menus))
                        <ul class="nav">
                            @foreach($menus['menutop'] as $key=>$value)
                                <li>
                                    <a href="{{url($value->link)}}">
                                        <span class="menu-text">{{$value->name}}</span>
                                        <i class="fa fa-angle-down"></i>
                                    </a>
                                    @if($value->children->count()!=0)
                                        @if($value->megamenu==1)
                                    <div class="mega-menu dropdown-hover">
                                        @foreach($value->children as $child)
                                        <div class="menu-colum">
                                            <ul>
                                                <li><span class="mega-menu-text">{{ mb_strtoupper($child->name, 'UTF-8')}}</span></li>
                                                @if($child->children->count()!=0)
                                                    @foreach($child->children as $chil)
                                                <li><a href="{{url($chil->link)}}">{{$chil->name}}</a></li>
                                                    @endforeach
                                                @endif
                                            </ul>
                                        </div>
                                        @endforeach
                                    </div>
                                        @else
                                            <ul class="dropdown-submenu dropdown-hover">
                                                @foreach($value->children as $child)
                                                <li><a href="{{url($child->link)}}">{{$child->name}}</a></li>
                                               @endforeach
                                            </ul>
                                        @endif
                                    @endif
                                </li>

                            @endforeach
                        </ul>
                            @endif
                    </nav>
                </div>
                <div class="col-lg-2 col-xl-3 col-sm-6 col-6 col-custom">
                    <div class="header-right-area main-nav">
                     @include('themes.includes.cart')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>