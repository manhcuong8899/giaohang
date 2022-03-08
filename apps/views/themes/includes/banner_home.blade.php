<div class="container container-default custom-area">
    <div class="row">
        @foreach($viewimages['product'] as $key=>$img)
        <div class="col-md-4 col-sm-12 col-custom">
            <div class="banner-image hover-style">
                <a class="d-block" target="_blank" href="{{url($img->url)}}">
                    <img class="w-100" src="{{asset('public/images/images/'.$img->cates->code.'/'.$img->images)}}" alt="{{$img->name}}">
                </a>
            </div>
        </div>
        @endforeach
    </div>
</div>