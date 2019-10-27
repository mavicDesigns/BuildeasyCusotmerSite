<template>

    <div style="padding: 10px;background: #f6f6f6;">


        <div  style="padding: 50px 20px">

            <span><strong style="font-size: 32px">Order #{{order.title}}</strong></span>
            <span :class="'badge badge' + order.status">{{order.status | status}}</span>


            <vs-row>
                <vs-col class=" pad_20" vs-lg="8" vs-sm="8" vs-xs="12">

                    <div class="detail-block">
                        <div class="box-header">
                            <vs-col vs-w="6"> <h5><strong>Order Details</strong></h5></vs-col>
                            <vs-col vs-w="6" vs-align="flex-end">
                                <h5>Placed on wednesday 12 July</h5>
                            </vs-col>

                        </div>
                        <vs-divider></vs-divider>

                        <div class="box-body">

                            <vs-row>
                                <vs-row>
                                    <vs-col vs-w="3">
                                        <vs-avatar :src="product.images[0].src || ''" size="120px" text="Prague"></vs-avatar>
                                    </vs-col>
                                    <vs-col class="marg-t-20" vs-w="9">
                                        <h4>{{product.title}}</h4>
                                    </vs-col>
                                </vs-row>
                                <vs-col class="marg-t-20" vs-w="3"><strong>Quantity: </strong>{{order.quantity}} {{order.valuation}}</vs-col>
                                <vs-col class="marg-t-20" vs-w="3"><strong> Price: </strong>&#8358; {{order.price | currency}} </vs-col>
                                <vs-col class="marg-t-20" vs-w="3">
                                    <strong> Total Price : </strong>&#8358; {{order.total_price | currency}}
                                </vs-col>
                            </vs-row>

                        </div>

                        <vs-divider></vs-divider>

                        <div class="box-body">
                            <div class="data-row">

                                <div class="data-co">
                                    <div class="label"><h5>Full-name:</h5></div>
                                    <div class="value"><h5>{{order.buyer}}</h5></div>
                                </div>
                                <div class="data-co">
                                    <div class="label"><h5>Company Name:</h5></div>
                                    <div class="value"><h5>{{buyer.CompanyName}}</h5></div>
                                </div>
                                <div class="data-co">
                                    <div class="label"><h5>Country:</h5></div>
                                    <div class="value"><h5>{{buyer.country}}</h5></div>
                                </div>
                                <div class="data-co">
                                    <div class="label"><h5>State:</h5></div>
                                    <div class="value"><h5>{{buyer.city}}</h5></div>
                                </div>
                                <div class="data-co">
                                    <div class="label"><h5>District:</h5></div>
                                    <div class="value"><h5>{{buyer.community}}</h5></div>
                                </div>
                                <div class="data-co">
                                    <div class="label"><h5>Zip Code:</h5></div>
                                    <div class="value"><h5>{{buyer.zip}}</h5></div>
                                </div>
                                <div class="data-co">
                                    <div class="label"><h5>Main Address:</h5></div>
                                    <div class="value"><h6>{{buyer.address1}}</h6></div>
                                </div>
                            </div>

                            <vs-row vs-justify="flex-end">
                                <vs-button type="flat" size="medium" icon-pack="fa" icon="fa-edit">Edit Details</vs-button>
                            </vs-row>
                        </div>

                        <vs-divider></vs-divider>

                    </div>


                    <div class="box-body">
                        <vs-row vs-justify="flex-end">
                            <vs-button v-if="order.status < 3" type="filled" :disabled="order.status != 2" @click="tokenInputIsActive = !tokenInputIsActive" size="medium" icon-pack="fa" icon="fa-paper-plane">Confirm as Delivered</vs-button>
                            <vs-alert :active="order.status > 2" color="success" icon-pack="fa" icon="fa-check" >
                                <h6>This order has been Completed</h6>
                            </vs-alert>
                            <vs-popup
                                    title="Confirm Delivery"
                                    :active.sync="tokenInputIsActive">
                                <div class="con-exemple-prompt">
                                    <form @submit.prevent="confirmDelivery">
                                        Enter your Token and Password to <b>continue</b>.
                                        <vs-input style="width:100%;" placeholder="token" v-model="token"/>
                                        <br>
                                        <vs-input style="width:100%;" placeholder="Password" type="password" v-model="password"/>
                                        <div class="m-4" align="center">
                                            <button type="submit" class="btn btn-primary"> Submit</button>
                                        </div>
                                    </form>

                                </div>
                            </vs-popup>
                        </vs-row>
                    </div>


                </vs-col>
                <vs-col vs-lg="4" vs-sm="8" vs-xs="12"  class=" pad_20">

                    <div class="detail-block">
                        <div class="box-header">
                            <vs-col vs-w="6"> <h5><strong>Sales</strong></h5></vs-col>
                            <vs-col vs-w="6" vs-align="flex-end" align="right">
                                <h5>price</h5>
                            </vs-col>

                        </div>
                        <vs-divider></vs-divider>


                        <div class="box-body">
                            <vs-row>
                                <vs-col vs-w="7"> <p><strong>{{product.title}}</strong></p></vs-col>
                                <vs-col vs-w="5" vs-align="flex-end" align="right">
                                    <p>&#8358;{{order.quantity * order.price | currency}}</p>
                                </vs-col>
                            </vs-row>
                            <vs-row>
                                <vs-col vs-w="7"> <p><strong>2 day delivery</strong></p></vs-col>
                                <vs-col vs-w="5" vs-align="flex-end" align="right">
                                    <p>&#8358;{{order.price | currency}}</p>
                                </vs-col>
                            </vs-row>
                            <vs-row>
                                <vs-col vs-w="7"> <p><strong>Tax</strong></p></vs-col>
                                <vs-col vs-w="5" vs-align="flex-end" align="right">
                                    <p>&#8358;{{0.2 }}</p>
                                </vs-col>
                            </vs-row>
                            <vs-divider></vs-divider>
                            <vs-row>
                                <vs-col vs-w="7"> <p><strong></strong></p></vs-col>
                                <vs-col vs-w="5" vs-align="flex-end" align="right">
                                    <p>&#8358; {{(parseInt(order.price) * order.quantity) + 0.2 | currency}}</p>
                                </vs-col>
                            </vs-row>
                            <vs-divider></vs-divider>

                        </div>

                    </div>
                </vs-col>
            </vs-row>

        </div>






    </div>

</template>

<style>

    .pad_20{
        padding: 20px;
    }

    .data-co{
        display: inline-block;
        margin:5px 10px;
    }

    .data-co div{
        display: inline-block;
        margin: 5px;
    }

    .data-co div.label h5{
        font-size: 17px;
        font-weight: bold;
    }

    .badge{
        font-size: 15px;
        background: red;
        color: white;
        margin: 0 20px;
        user-select: none;
    }


    .marg-t-20{
        margin-top: 20px;
    }
    .box-header{
        padding: 25px 20px;
    }

    .box-body{
        padding: 25px 20px;
    }

    .marg{
        margin: 20px 20px;
    }

    .detail-block{
        border-radius: 10px;
        background: white;
    }
    .badge{
        padding: 10px;
    }

    .badge3{
        background: #2f805b;
    }



</style>
<script>

    import {http} from '../../_helpers/http/http'

    export default {
        name: 'Order Review',

        data(){
            return{
                isCollapsed: false,
                isLoading:true,
                password:'',
                tokenInputIsActive: false,
                token:'',
                order:null,
                user:{},
                product:{}
            }
        },

        watch: {
            isLoading: function (val) {

                if(val === true){
                    this.$vs.loading();
                }else {
                    this.$vs.loading.close();
                }
            }
        },

        mounted(){
          this.updatePage();
        },

        methods:{

            confirmDelivery(){
                this.isLoading = true;
                const self = this;
                const rspData = {
                    secret: this.token,
                    password: this.password,
                    token: localStorage.getItem('token')
                };
                this.tokenInputIsActive = false;

                http.post('/allOrders/'+self.$route.params.order_id+'/verify?api_key=4ntbqhy2g0mc&order_id='+self.$route.params.order_id,JSON.stringify(rspData))
                    .then(() => {



                        self.$swal({
                            title:'Order Completed',
                            text:'Congratulations This Product has been completed',
                            type:'success',
                        });

                        self.updatePage();

                    })
                    .catch(error => {
                        if(error.response.status === 406){
                            alert('Secret in Invalid')
                        }else {
                            alert(JSON.stringify(error.response))
                        }
                    }).finally(() => {
                    this.isLoading = false;
                })
            },



            updatePage(){

                const self = this;
                this.isLoading = true;
                http.get('/allOrders/'+self.$route.params.order_id+'?api_key=4ntbqhy2g0mc')
                    .then((resp) => {


                        self.order = resp.data.current_order;
                        self.product = resp.data.product;
                        self.buyer = resp.data.customer;


                    })
                    .catch((err) => {
                       alert(JSON.stringify(err))
                    }).finally( ()=> {
                        this.isLoading = false;
                    })


            }

        }
    }

</script>