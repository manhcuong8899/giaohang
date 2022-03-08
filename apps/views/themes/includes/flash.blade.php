@if (count($errors) > 0)
    <div class="alert alert-danger">
        <strong>Thông báo!:</strong> <br><br>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

@if(Session::has('flash_message'))
    <div class="alert alert-success">
        {{ Session::get('flash_message') }}
    </div>
@endif
@if (session('status'))
    <div class="alert alert-success">
        {{ session()->get('status') }}
    </div>
@endif