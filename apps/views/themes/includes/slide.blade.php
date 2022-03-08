<div class="obrien-slider arrow-style" data-slick-options='{
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "infinite": true,
        "arrows": true,
        "dots": true,
        "autoplay" : true,
        "fade" : true,
        "autoplaySpeed" : 7000,
        "pauseOnHover" : false,
        "pauseOnFocus" : false
        }' data-slick-responsive='[
        {"breakpoint":992, "settings": {
        "slidesToShow": 1,
        "arrows": false,
        "dots": true
        }}
        ]'>
    @foreach($viewimages['slide'] as $key=>$img)
    <div class="slide-item bg-position slide-bg-1 animation-style-01" style="background-image: url({{asset('public/images/images/'.$img->cates->code.'/'.$img->images)}}); background-color: rgba(215, 177, 190, 0.9);">
        <div class="slider-content">
            <h2 class="slider-large-title">{{$img->name}}</h2>
            <h4 class="slider-small-title">{{$img->short}}</h4>
            <div class="slider-btn">
                <a class="obrien-button black-btn" href="{{$img->url}}">Xem ngay</a>
            </div>
        </div>
    </div>
    @endforeach

</div>