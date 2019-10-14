<template>

    <div class="dashHeader">
        <div class="header">
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent">


                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav nav-text  mr-auto">
                        <li class="nav-item active"><router-link to="/">
                            <a class="nav-link" href="javascript:void (0)">Pages <span class="sr-only">(current)</span></a></router-link>
                        </li>
                        <li class="nav-item"><router-link to="/store">
                            <a class="nav-link" href="javascript:void (0)">Analytics</a></router-link>
                        </li>
                    </ul>


                    <ul class="navbar-nav nav-icons">
                        <li class="nav-item active">
                            <a class="nav-link" href="#"><i class="far fa-heart"></i> </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#"><i class="far fa-shopping-cart"></i></a>
                        </li>

                        <li class="nav-item active">
                            <a class="nav-link" href="#"><i class="far fa-user-circle"></i></a>
                        </li>

                        <li class="nav-item active">
                            <a class="nav-link" href="#"><i class="fas fa-search"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
        <div class="breadcrumbX">

            <h6>Dashboard</h6>

        </div>
    </div>

</template>

<style>

    .breadcrumbX{
        background: #fff;
        width: 100%;
        padding:  20px;
        border-top: 1px solid #ebebeb;
    }

    .dashHeader .header{
        background: #fff;
        padding: 5px 20px;
    }

    .dashHeader .navbar-nav .nav-item .nav-link{
        font-size: 14px;
    }

    .dashHeader .nav-text .nav-item .nav-link{
        color: #6c7293 !important;
        font-weight: normal;
        margin: 0;
        padding: 10px 20px !important;
        width: 100%;
    }
    .dashHeader .nav-text .nav-item.active,.dashHeader .nav-text .nav-item:hover{
        background-color: rgba(77, 89, 149, 0.06);
    }

    .dashHeader .nav-text .nav-item{
        border-radius: 4px;
    }

    .dashHeader .nav-text .nav-item.active .nav-link {
        color: #5d78ff !important;
    }

    .dashHeader .nav-text .nav-item .nav-link:hover {
        text-decoration: none !important;
    }

</style>