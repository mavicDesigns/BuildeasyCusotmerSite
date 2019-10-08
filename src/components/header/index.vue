<template>

    <div class="navigation">
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
            <a class="navbar-brand" href="#"><img src="/img/shopkeeper-logo.png" width="100%"/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>


            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav  mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="javascript:void (0)"><router-link to="/">Home <span class="sr-only">(current)</span></router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void (0)"><router-link to="/store">Store</router-link></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
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

</template>

<script>
    export default {
        name: 'headerX'
    }
</script>