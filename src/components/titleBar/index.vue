<template>

    <div class="model titleBarTem">

        <div class="container">
            <div class="row">
                <div class="title-bar">
                    <h1>{{title}}</h1>
                </div>

            </div>
        </div>

    </div>

</template>

<script>

    export default {

        name: 'titleX',
        props:['title']

    }

</script>

<style>

    .titleBarTem{
        padding: 70px 50px;
    }
    .titleBarTem .title-bar{
        text-align: center;
        width: 100%;
    }

    .titleBarTem .title-bar h1{
        font-weight: 900;
    }

</style>