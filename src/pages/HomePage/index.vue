<template>

    <div class=" homepage">

        <div class="hero">

            <div class="hero-heading">
                <h2>A Better Way To connect suppliers for Your Building Projects </h2>
            </div>

        </div>

    </div>

</template>

<style>
    .homepage{}
    
    .homepage .hero{
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