<div class="container custom-area">
    <div class="row">
        <div class="col-lg-12 col-custom">
            <div class="obrien-slider" data-slick-options='{
                        "slidesToShow": 5,
                        "slidesToScroll": 1,
                        "infinite": true,
                        "arrows": false,
                        "dots": false
                        }' data-slick-responsive='[
                        {"breakpoint": 1200, "settings": {
                        "slidesToShow": 4
                        }},
                        {"breakpoint": 992, "settings": {
                        "slidesToShow": 3
                        }},
                        {"breakpoint": 576, "settings": {
                        "slidesToShow": 3
                        }},
                        {"breakpoint": 481, "settings": {
                        "slidesToShow": 2
                        }}
                        ]'>
                @foreach($viewimages['brand'] as $key=>$img)
                <div class="brand-logo-item">
                    <a href="{{url($img->url)}}">
                        <img src="{{asset('public/images/images/'.$img->cates->code.'/'.$img->images)}}" alt="{{$img->name}}">
                    </a>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>