<template>

    <div class="model">
        <h1>FGHJ</h1>
    </div>

</template>

<script>


    export default {

        components: {},

        mounted(){
            this.$emit('titleChanged', 'HEY There')
        }


    }

</script>