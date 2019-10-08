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
                            <vs-button   @click="handlePayment" type="filled" style="width:100%;" color="primary">Verify</vs-button>
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
    import {Transaction, Card} from 'paystack-js'
    import {mapActions,mapGetters} from 'vuex'


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

        },
        watch: {
            stepper: function (val) {
                this.$emit('update:stepper', val)
            }

        },
        methods:{
            ...mapActions('Auth',['USER_REQUEST','AUTH_LOGOUT']),
            ...mapActions('Cart',['placeOrder']),

            completeOrder(){
                let self = this;
                this.USER_REQUEST()
                    .then(res => {
                        if(res === null){
                            http({url:"/customers/register/"+ localStorage.getItem('token') + "?api_key=hehehe" ,method: 'POST',data: JSON.stringify(self.$store.state.address)})
                                .then((resp) => {
                                    self.placeOrder( resp.data.customer, self.$store.state.address )
                                        .then(() => { this.$router.push('/dashboard')})
                                        .catch(()  => {})
                                })
                                .catch(() => {})
                        }else {
                            alert(' Customer');
                            this.placeOrder( res)
                                .then(() => { this.$router.push('/dashboard')})
                                .catch(()  => {})
                        }
                    })
                    .catch(() => {
                        this.AUTH_LOGOUT()
                            .then(() => this.$router.push('/login'))
                    })



            },

            async handlePayment(){

                this.$vs.loading();

                try{

                    const requestData = {
                        email: 'osanmisola@gmail.com',
                        amount: parseInt(this.cartTotal), // amount in kobo
                        key: 'pk_live_528d167def4c2f1f91f6f1da991fc72f57b89885',
                    };

                    const transaction =  await Transaction.request(requestData);

                    const card = new Card({
                        number: '4084084084084081',
                        cvv: '408',
                        month: '12',
                        year: '20',
                    });

// Payment method instances provide validation functions that
// you can use to check for validaty before setting payment method
                    if (card.isValid()) {
                        try {
                            transaction.setPaymentMethod('card', card);
                        } catch(e) {
                            alert(JSON.stringify(e))
                        }
                    }

                    this.$vs.loading.close();

                }catch (e){
                    alert(JSON.stringify(e))
                }finally{
                    this.$vs.loading.close();
                }


            }

        }


    }

</script>