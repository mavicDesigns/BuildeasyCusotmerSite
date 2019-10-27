<template>

    <div class="container p-5 order-table">
        <vs-table
                :sst="true"
                v-model="selected"
                :data="orders">
            <template slot="header">
              <div class="table-header">
                  <h4>Review Your Orders
                  </h4>
              </div>
            </template>
            <template slot="thead">
                <vs-th>
                   Order Id
                </vs-th>
                <vs-th>
                    City
                </vs-th>
                <vs-th>
                    Date
                </vs-th>
                <vs-th>
                    Status
                </vs-th>
                <vs-th>
                    Actions
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                    <vs-td :data="data[indextr].order_id">
                        #{{data[indextr].order_id}}
                    </vs-td>

                    <vs-td :data="data[indextr].buyer">
                        {{data[indextr].buyer}}
                    </vs-td>

                    <vs-td :data="data[indextr].created_at">
                        {{data[indextr].created_at}}
                    </vs-td>

                    <vs-td  :data="data[indextr].status" align="center">
                        <span :class="'s-badge s-badge'+data[indextr].status">{{data[indextr].status | status}}</span>
                    </vs-td>

                    <vs-td>
                        <span class=""><i class="act-icons fas fa-ellipsis-h"></i></span>
                        <span class=""><router-link :to="'orders/'+data[indextr].order_id"><i class="act-icons far fa-edit"></i></router-link></span>
                    </vs-td>
                </vs-tr>
            </template>



        </vs-table>


    </div>
</template>

<style>

    .s-badge{
        border-radius: 40px;
        color: #fff;
        font-size: 12px;
        padding: 7px;
    }

    .s-badge2{
        background: red;
    }

    .s-badge3{
        background: #2f805b;
    }

    .act-icons{
        color: #93a2dd;
        margin: 10px;
    }

    .table-header{
        background: #fff;
        width: 100%;
        border-radius: 4px !important;
        padding:  20px;
        margin: 0;
    }
    .vs-table--thead .vs-table--thead .td-check .con-td-check{
        box-shadow: none;
        -webkit-box-shadow: none;
    }


</style>

<script>

    import {mapActions, mapGetters} from 'vuex'

    export default {
        data(){
            return{
                selected:[],
                orders: []
            }
        },

        created(){

        },

        async mounted(){

            await this.USER_REQUEST();

            let user =  this.getUser;

            this.getOrders(user.user_id)
                .then((res) => {
                    this.orders = [...this.orders, ...res];
                })
                .catch(() => {

                })
        },
        computed:{
            ...mapGetters('Auth', ['getUser'])
        },

        methods:{
            ...mapActions('Orders', ['getOrders']),
            ...mapActions('Auth', ['USER_REQUEST']),
        }
    }
</script>