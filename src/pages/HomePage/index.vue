<template>

    <div class=" homepage">

        <div class="hero">

        </div>

    </div>

</template>

<style>
    .homepage{}
    
    .homepage .hero{
        background-image: url("/img/hero-bg.jpg") ;
        width: 100%;
        height: 530px;
    }
    
</style>

<script>


    export default {

        components: {},

        mounted(){
            this.$emit('titleChanged', '')
        }


    }

</script>