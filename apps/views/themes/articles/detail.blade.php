@extends('themes.articlesdetail')
@section('page_title')
@endsection
@section('main-content')
    <div class="breadcrumbs-area position-relative" style="background: #f6f6f6 url({{asset('themes/assets/images/bg/1-1.jpg')}}) no-repeat scroll center center/cover; padding: 100px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="breadcrumb-content position-relative section-content">
                        <h3 class="title-3"></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <!-- Shop Main Area Start Here -->
    <div class="shop-main-area">
            <div class="container container-default custom-area">
                <div class="row flex-row-reverse">
                    <div class="col-lg-9 col-12 col-custom widget-mt">
                        <div class="blog-post-details">
                            <section class="blog-post-wrapper product-summery">
                                <div class="section-content">
                                    <h2 class="title-1 mb-3">{{$article->name}}</h2>
                                    <p class="mb-4">
                                        {!! $article->long !!}
                                    </p>
                                </div>
                                <div class="share-article">
                                    <span class="left-side">
                                   <i class="fa fa-long-arrow-left"></i>
                                </span>
                                    <h6 class="text-uppercase">Chia sẻ bài viết</h6>
                                    <span class="right-side">
                                  <i class="fa fa-long-arrow-right"></i>
                                </span>
                                </div>
                                <div class="social-share">
                                    <a href="#"><i class="fa fa-facebook-square facebook-color"></i></a>
                                    <a href="#"><i class="fa fa-twitter-square twitter-color"></i></a>
                                    <a href="#"><i class="fa fa-linkedin-square linkedin-color"></i></a>
                                    <a href="#"><i class="fa fa-pinterest-square pinterest-color"></i></a>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="col-lg-3 col-12 col-custom">
                        <!-- Sidebar Widget Start -->
                    @include('themes.includes.sidebar_product')
                    <!-- Sidebar Widget End -->
                    </div>
                </div>
            </div>
    </div>
    <!-- Blog Main Area End Here -->
@endsection
@section('page-script')
@endsection