@extends('themes.articles')
@section('page_title')
@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3">{{$cates->name}}</h3>
                        <ul>
                            <li><a href="#">{{$type->name}} </a></li>
                            <li>{{$cates->name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Blog Main Area Start Here -->
    <div class="blog-main-area">
        <div class="container container-default custom-area">
            <div class="row">
                <div class="col-12 col-custom mt-no-text">
                    <!-- Blog Wrapper Start -->
                    <div class="row">
                        @foreach($articles as $value)
                        <div class="col-lg-4 col-md-6 col-custom mb-4">
                            <div class="single-blog">
                                @if($value->images!="")
                                <div class="single-blog-thumb">
                                    <a href="{{url($value->slug)}}">
                                        <img src="{{asset('public/images/articles/'.$type->code.'/'.\Illuminate\Support\Str::slug($value->name)).'/'.$value->images}}" alt="{{$value->name}}">
                                    </a>
                                </div>
                                @endif
                                <div class="single-blog-content position-relative">
                                    <div class="post-date text-center border rounded d-flex flex-column position-absolute">
                                        <span>{{date('d',strtotime($value->created_at))}}</span>
                                        <span>{{date('m',strtotime($value->created_at))}}</span>
                                    </div>
                                    <div class="post-meta">
                                        <span class="author">Đăng bởi: Admin</span>
                                    </div>
                                    <h2 class="post-title">
                                        <a href="{{url($value->slug)}}">{{$value->name}}</a>
                                    </h2>
                                    <p class="desc-content">{!!$value->short!!}</p>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                    <!-- Blog Wrapper End -->
                    <!-- Bottom Toolbar Start -->
                    <div class="row mb-no-text">
                        <div class="col-sm-12 col-custom">
                            <div class="toolbar-bottom mb-0">
                                <nav class="pagination pagination-wrap mb-10 mb-sm-0">
                                    <ul class="pagination">
                                        {!! $articles->render() !!}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <!-- Bottom Toolbar End -->
                </div>
            </div>
        </div>
    </div>
    <!-- Blog Main Area End Here -->
@endsection
@section('page-script')
@endsection