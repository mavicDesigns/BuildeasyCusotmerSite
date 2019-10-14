<template>

    <div class="model">
        <sidebar></sidebar>
       <div class="page-content">
           <header-x></header-x>
           <router-view></router-view>

       </div>

    </div>


</template>
<style>
    body{
    }

    .page-content{
        width: 82%;
        margin-left: 18%;
        overflow-y: auto;
        font-family: 'Poppins', sans-serif !important;
    }

</style>

<script>

    import Sidebar from './components/sidebar.vue'
    import HeaderX from './components/_header.vue'
    import {mapActions} from 'vuex'

    export  default {

      name: '',
      components:{
          Sidebar,
          HeaderX
      },
        methods:{
            ...mapActions('Auth', ['USER_REQUEST'])
        },

        created(){
            this.USER_REQUEST();
        }

  }

</script>