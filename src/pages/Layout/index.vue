<template>

    <div class="model">

        <header-x></header-x>
        <title-x v-if="title !== ''" :title="title"></title-x>

        <router-view @titleChanged="titleChanged"></router-view>


    </div>

</template>

<script>

    import HeaderX from "../../components/header/index.vue";
    import TitleX from "../../components/titleBar/index.vue"

    export default {
        data(){
          return{
              title: ''
          }
        },
        methods: {
            titleChanged(e){
                this.title = e;
            }
        },
        components: {HeaderX, TitleX},


    }

</script>