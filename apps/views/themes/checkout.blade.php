<!doctype html>
<html class="no-js" lang="en">

<head>
    @include('themes.includes.header')
</head>
<body>
<div class="home-wrapper home-2">
    <!-- Header Area Start Here -->
    <header class="main-header-area">
        <!-- Main Header Area Start -->
        <div class="main-header" style="background-color: #234922;">
            @include('themes.includes.main_header')
        </div>
        <!-- Main Header Area End -->
        <!-- Sticky Header Start Here-->
        <div class="main-header header-sticky" style="background-color: #234922;">
            @include('themes.includes.main_header-sticky')
        </div>
        <!-- Sticky Header End Here -->
        <!-- off-canvas menu start -->
        <aside class="off-canvas-wrapper" id="mobileMenu">
            @include('themes.includes.mobile')
        </aside>
        <!-- off-canvas menu end -->
    </header>
@yield('main-content')

<!-- Brand Logo Area Start Here -->
    <div class="brand-logo-area mt-text mb-no-text">
        @include('themes.includes.brand')
    </div>


    <footer class="footer-area">
        @include('themes.includes.footer')
    </footer>
    <!-- Footer Area End Here -->
</div>

<!-- Modal Area Start Here -->
<div class="modal fade obrien-modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
    @include('themes.includes.modal')
</div>
<!-- Modal Area End Here -->

<!-- Scroll to Top Start -->
<a class="scroll-to-top" href="#">
    <i class="ion-chevron-up"></i>
</a>
@include('themes.includes.script')
@yield('page-script')
</body>
</html>