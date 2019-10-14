<template>

    <div class="container p-5 order-table">
        <vs-table
                multiple
                v-model="selected"
                :data="orders">
            <template slot="header">
              <div class="table-header">
                  <h4>Exclusive Datatable Plugin
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
                    <vs-td :data="data[indextr].email">
                        {{data[indextr].email}}
                    </vs-td>

                    <vs-td :data="data[indextr].username">
                        {{data[indextr].username}}
                    </vs-td>

                    <vs-td :data="data[indextr].website">
                        {{data[indextr].id}}
                    </vs-td>

                    <vs-td :data="data[indextr].id">
                        {{data[indextr].id}}
                    </vs-td>

                    <vs-td>
                        <span ></span>
                    </vs-td>
                </vs-tr>
            </template>



        </vs-table>

        <span class="alert" v-if="orders.length > 0">{{orders.length}}</span>

    </div>
</template>

<style>

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
            this.getOrders()
                .then((res) => {
                    alert(JSON.stringify(res))
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