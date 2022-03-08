<aside class="sidebar_widget widget-mt">
    <div class="widget_inner">
        <div class="widget-list widget-mb-1">
            <h3 class="widget-title">Tìm kiếm</h3>
            <div class="search-box">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Nhập từ khóa tìm kiếm">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        @if (array_key_exists("products",$menus))
        <div class="widget-list widget-mb-1">
            <h3 class="widget-title">Danh mục sản phẩm</h3>
            <!-- Widget Menu Start -->
            <nav>
                <ul class="mobile-menu p-0 m-0">
                    @foreach($menus['products'] as $key=>$value)
                        @if($value->children->count()!=0)
                    <li class="menu-item-has-children"><a href="#">{{$value->name}}</a>
                        @else
                            <li class="menu-item-has-children"><a href="{{url($value->link)}}">{{$value->name}}</a>
                                @endif
                        <ul class="dropdown">
                            @foreach($value->children as $child)
                            <li><a href="{{url($child->link)}}">{{$child->name}}</a></li>
                            @endforeach
                        </ul>
                    </li>
                       @endforeach
                </ul>
            </nav>
            <!-- Widget Menu End -->
        </div>
        @endif
        @if (array_key_exists("menudexuat",$menus))
        <div class="widget-list widget-mb-1">
            <h3 class="widget-title">Đề xuất</h3>
            <div class="sidebar-body">
                <ul class="sidebar-list">
                    @foreach($menus['menudexuat'] as $key=>$value)
                    <li><a href="{{url($value->link)}}">{{$value->name}}</a></li>
                    @endforeach
                </ul>
            </div>
        </div>
        @endif
    </div>
</aside>