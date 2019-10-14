<template>

    <div class="full-width" >

        <div class="stepper">
            <div class="stepper_body">
                <vs-alert :active="true">Signed in as Osanmisola</vs-alert>


                <div class="form">
                    <vs-row vs-justify="space-around">
                        <vs-col vs-lg="6" vs-sm="12">
                            <div class="form-group">
                                <vs-row class="m-2">
                                    <vs-col vs-w="12"><vs-input
                                            :danger="$v.card.cardName.$error"
                                            :danger-text="'Card Name required' "
                                            @input="$v.card.cardName.$touch();"
                                            v-model="card.cardName" style="width: 98%" color="primary" label-placeholder="Card Name"></vs-input></vs-col>
                                </vs-row>

                                <vs-row class="m-2">
                                    <vs-col vs-w="12"><vs-input
                                            :danger="$v.card.cardNumber.$error"
                                            type="number" min="-999" max="9999"
                                            :danger-text="'Card Number required' "
                                            @input="$v.card.cardNumber.$touch();"
                                            v-model="card.cardNumber" style="width: 98%" color="primary" label-placeholder="Card Number"></vs-input></vs-col>
                                </vs-row>

                                <vs-row class="m-2">
                                    <vs-col vs-lg="6" vs-sm="12">
                                        <vs-input
                                                maxlength="4"
                                                :danger="$v.card.expiryDate.$error"
                                                :danger-text="'Card Expiry Date required' "
                                                @input="$v.card.expiryDate.$touch();"
                                                v-model="card.expiryDate" style="width: 95%" color="primary" placeholder="01/01" label="Expiry Date"></vs-input></vs-col>
                                    <vs-col vs-lg="6" vs-sm="12">
                                        <vs-input
                                                :danger="$v.card.cvv.$error"
                                                maxlength="3"
                                                :danger-text="'Card CVV required' "
                                                @input="$v.card.cvv.$touch();"
                                                v-model="card.cvv" style="width: 95%" color="primary" placeholder="xxx" label="CVV"></vs-input></vs-col>
                                </vs-row>
                            </div>
                        </vs-col>


                    </vs-row>
                    <vs-row vs-justify="space-around">
                        <vs-col vs-lg="3" vs-sm="12">
                            <vs-button   @click="completeOrder" type="filled" style="width:100%;" color="primary">Verify</vs-button>
                        </vs-col>
                    </vs-row>
                </div>


            </div>

        </div>

        <div class="stepper-controls">
            <div class="left"><button  :disabled="!prevCanMove"  class="btn btn-danger">Prev</button> </div>
            <div class="right"><button :disabled="!nextCanMove"  @click="stepper = 2" class="btn btn-danger">Next</button> </div>
        </div>


    </div>


</template>

<style>

    .full-width{
        width: 100%;
    }



</style>

<script>

    import { required } from 'vuelidate/lib/validators'
    import {http} from '../../../_helpers/http/http'
    import {mapActions,mapGetters, mapMutations} from 'vuex'


    export default {



        data(){
            return{
                value1:'',
                stepper: 3,
                card:{
                    cardName:'',
                    cardNumber:'',
                    cvv:'',
                    expiryDate:''
                },
                prevCanMove: true,
                nextCanMove: false,


            }
        },

        mounted(){

        },

        validations:{
            card:{
                cardName:{
                    required
                },
                cardNumber:{
                    required
                },
                cvv:{
                    required
                },
                expiryDate:{
                    required
                }
            }
        },


        computed:{
            ...mapGetters('Cart',[
                 'cartProducts',
                 'cartTotal'
            ]),
            ...mapGetters('Auth',[
                 'getUser',
            ]),

        },
        watch: {
            stepper: function (val) {
                this.$emit('update:stepper', val)
            }

        },
        methods:{
            ...mapActions('Auth',['USER_REQUEST','AUTH_LOGOUT']),
            ...mapActions('Cart',['placeOrder']),
            ...mapMutations('Cart',['setCart']),

            completeOrder(){
                let self = this;
                this.$vs.loading();
                this.USER_REQUEST()
                    .then(res => {
                        if(res === null){
                            http({url:"/customers/register/"+ localStorage.getItem('token') + "?api_key=hehehe" ,method: 'POST',data: JSON.stringify(self.$store.state.address)})
                                .then((resp) => {
                                    self.placeOrder( resp.data.customer, self.$store.state.address );
                                })
                                .catch(() => {})
                        }else {
                            alert('Customer');
                            this.placeOrder(res)
                                .then((res) =>  {
                                    this.$vs.loading.close();
                                    this.handlePayment(res.data.totalPrice,res.data.orders, res.data.user)
                                });
                        }
                    })
                    .catch(() => {
                        this.AUTH_LOGOUT()
                            .then(() => this.$router.push('/login'))
                    }).finally( () =>{

                })



            },

            async handlePayment(amount, payload, user) {


                // eslint-disable-next-line
                const handler = PaystackPop.setup({

                    key: 'pk_test_6a5bd38bed3603ec619a2a3cdd2a4d2a69e91d81',
                    email: user.email,
                    amount: amount * 100,
                    currency: "NGN",
                    ref: Math.random().toString(36).substring(7), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                    metadata: {
                        custom_fields: [
                            {
                                display_name: "Mobile Number",
                                variable_name: "mobile_number",
                                value: "+2348012345678"
                            }
                        ]
                    },
                    callback: function(response){

                        // console.log(response);
                        const the = this;

                        if (response.status === 'success'){

                            http({url: '/createOrder/payTransaction?api_key=4ntbqhy2g0mc', method:'POST', data: JSON.parse(payload)})
                                .then(() => {
                                    localStorage.setItem("carts", JSON.stringify([]));
                                    the.setCart(); //Update cart states
                                    the.$swal({
                                        title: 'Done',
                                        text: 'Your Order is on it\'s way, Proceed to dashboard to track',
                                        type: 'Success',
                                        confirmButtonText: 'Continue',
                                    })
                                }).catch((err) => {
                                    alert(JSON.stringify(err))
                                })


                        }else {

                            this.$swal({
                                title: 'Could not complete',
                                text: 'There is something wrong with the Network Please Try again',
                                type: 'error',
                                confirmButtonText: 'Try Again',
                                showCloseButton: true,
                            })

                        }


                    },
                    onClose: function(){
                        const the = this;
                        http({url: '/createOrder/endTransaction?api_key=wuwu', method:'Post', data:payload})
                            .then(() => {
                                the.$swal({
                                    title: 'You\'ve Just Ended the transaction',
                                    text: 'You can\'t revert your action',
                                    type: 'warning',
                                    confirmButtonText: 'Try Again',
                                    showCloseButton: true,
                                })
                            }).catch(() => {

                        })
                    }
                });
                handler.openIframe();

            }


        }


    }

</script>