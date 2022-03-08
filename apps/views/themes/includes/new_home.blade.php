<div class="container container-default custom-area">
    <div class="row">
        <div class="col-lg-5 m-auto text-center col-custom">
            <div class="section-content">
                <h2 class="title-1 text-uppercase">TIN TỨC MỚI NHẤT</h2>
            </div>
        </div>
        <div class="col-lg-12 col-custom">
            <div class="obrien-slider" data-slick-options='{
                        "slidesToShow": 3,
                        "slidesToScroll": 1,
                        "infinite": true,
                        "arrows": false,
                        "dots": false
                        }' data-slick-responsive='[
                        {"breakpoint": 1200, "settings": {
                        "slidesToShow": 2
                        }},
                        {"breakpoint": 992, "settings": {
                        "slidesToShow": 2
                        }},
                        {"breakpoint": 768, "settings": {
                        "slidesToShow": 1
                        }},
                        {"breakpoint": 576, "settings": {
                        "slidesToShow": 1
                        }}
                        ]'>
                @foreach($news as $anew)
                <div class="single-blog">
                    <div class="single-blog-thumb">
                        <a href="{{$anew->slug}}">
                            <img src="{{asset('public/images/articles/news/'.\Illuminate\Support\Str::slug($anew->name).'/'.$anew->images)}}" alt="{{$anew->name}}">
                        </a>
                    </div>
                    <div class="single-blog-content position-relative">
                        <div class="post-date text-center border rounded d-flex flex-column position-absolute">
                            <span>{{date('d',strtotime($anew->created_at))}}</span>
                            <span>{{date('m',strtotime($anew->created_at))}}</span>
                        </div>
                        <div class="post-meta">
                            <span class="author">Người viết: Admin</span>
                        </div>
                        <h2 class="post-title">
                            <a href="{{$anew->slug}}">{{$anew->name}}</a>
                        </h2>
                        <p class="desc-content">{!! $anew->short!!}...</p>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>