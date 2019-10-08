<template>

    <div class="model">

        <div class="container">
            <div class="row">

                <div class="stepper-navs">
                    <div class="md-stepper-horizontal orange">
                        <div  :class="[{'active' : stepper === 1},{'active done' : stepper >= 2} , 'md-step']">
                            <div class="md-step-circle"><span>1</span></div>
                            <div class="md-step-title">Checkout</div>
                            <div class="md-step-bar-left"></div>
                            <div class="md-step-bar-right"></div>
                        </div>
                        <div :class="[{'active' : stepper === 2},{'active done' : stepper >= 3} , 'md-step']">
                            <div class="md-step-circle"><span>2</span></div>
                            <div class="md-step-title">Shipping</div>
                            <div class="md-step-optional">Optional</div>
                            <div class="md-step-bar-left"></div>
                            <div class="md-step-bar-right"></div>
                        </div>
                        <div :class="[{'active' : stepper === 3},{'active done' : stepper >= 4} , 'md-step']">
                            <div class="md-step-circle"><span>3</span></div>
                            <div class="md-step-title">Payment</div>
                            <div class="md-step-bar-left"></div>
                            <div class="md-step-bar-right"></div>
                        </div>
                        <div class="md-step">
                            <div class="md-step-circle"><span>4</span></div>
                            <div class="md-step-title">Review</div>
                            <div class="md-step-bar-left"></div>
                            <div class="md-step-bar-right"></div>
                        </div>
                    </div>

                </div>


                <cart v-show="stepper == 1" :stepper.sync="stepper"></cart>
                <paddress v-show="stepper == 2" :stepper.sync="stepper"></paddress>
                <payment  v-show="stepper == 3"  :stepper.sync="stepper">b</payment>


            </div>
        </div>

    </div>

</template>

<style>


</style>

<script>

    import Cart from './components/cart.vue'
    import Paddress from './components/address.vue'
    import Payment from './components/payment.vue'

    export default {

        components:{
            Paddress,
            Payment,
            Cart,
        },

        created(){
            this.$emit('titleChanged', 'Checkout')
        },

        data(){
            return{
                stepper:1,
                prevCanMove: false,
                nextCanMove: true,
            }
        },

        methods:{

        },

        watch:{
        }
    }

</script>