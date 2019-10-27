<template>


    <div class="sidebar">
        <div class="">

            <div class="titlebar">
                <h4>Buildeasy</h4>
            </div>

            <div class="">

                <ul class="linkList">
                    <li class="list-item active"><router-link to="/dashboard"><i class="fas fa-tachometer-alt"></i> <a href="javascript:void(0)" class="list-link">Dashboard</a> </router-link></li>
                    <li class="list-item"><router-link to="/dashboard/orders"><i class="fas fa-tachometer-alt"></i> <a href="javascript:void(0)" class="list-link">Orders</a> </router-link></li>
                    <li class="list-item"><router-link to="/dashboard/settings"><i class="fas fa-tachometer-alt"></i> <a href="javascript:void(0)" class="list-link">Settings</a> </router-link></li>
                </ul>


            </div>

        </div>

    </div>

</template>

<style>

    .linkList{
        padding: 20px 0;
        list-style: none;
    }
    .linkList li{
        padding:10px 20px ;
    }
    .linkList li.active, .linkList li:hover{
       background-color:#1b1b28 ;
    }
    .linkList li a{
       color: rgba(226, 226, 226, 0.87) !important;
    }

    .linkList li i{
        padding:10px ;
        font-size: 20px;
        color: rgba(226, 226, 226, 0.87) !important;
    }

    .linkList li:hover  a,.linkList li:hover  i {
        color: #fff !important;
    }
    .linkList li a:hover{
        text-decoration: none;
    }


.sidebar{
    width: 18%;
    display: inline-block;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    position: fixed;
    top:0;
    background-color: #1e1e2d;
}
    .titlebar{
        width: 100%;
        background-color: #1b1b28;
        padding:  20px;
    }
    .titlebar h4{
        color: white;
    }


</style>


<script>

    export default {
        components: {},
        name: ''
    }

</script>