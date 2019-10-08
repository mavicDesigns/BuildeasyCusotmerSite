<template>

    <div class="full-width">
        <div class="stepper">

            <div class="table-data">
                <div  v-for="(item ,index) in cartProducts" :key="index" class="row  d-flex justify-content-lg-between">
                    <div class="col-lg-2 col-md-2 ">
                        <div class="img-box">
                            <img :src="item.images[0].src"/>
                        </div>
                    </div>

                    <div class="col-lg-5 col-md-7">
                        <h5 style="padding-top: 40px">{{item.title}}</h5>
                    </div>
                    <div class="col-lg-2">
                        <div class="qaun" style="padding-top: 30px">
                            <small><i @click="decreaseQuantity(item)" class=" quanControl fas fa-minus"></i></small>
                            <small><input placeholder="" type="text" min="1" maxlength="3" class="quanInput form-control" name="qty" v-model="item.quantity" /></small>
                            <small><i  @click="increaseQuantity(item)" class=" quanControl fas fa-plus"></i></small>

                        </div>
                    </div>
                    <div class="col-lg-3 tools">
                        <br>
                        <h4>&#8358; {{item.totalPrice}}</h4>
                        <button  @click="removeItem(item)"  class="btn btn-danger"><i class="fas fa-trash"></i></button>

                    </div>
                </div>



                </div>

            <div class="row">
                <div class="tools" style="width: 100%" align="right">
                    <button   @click="UpdateCart"  class="btn btn-danger">Update Cart</button>

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


    .stepper{
        width: 100%;
        padding: 30px;
        height: 500px;
        box-shadow: 0 3px 8px -6px rgba(0,0,0,.50);
    }

    .stepper-navs{
        width: 100%;
    }



    .stepper-controls{
        display: inline-block;
        width: 100%;
        padding: 30px;
        box-shadow: 0 3px 8px -6px rgba(0,0,0,.50);
    }
    .stepper-controls .right{
        float: right;
    }

    .stepper-controls .left{
        float: left;
    }

    .stepper-controls .left button, .stepper-controls .right button{
        padding: 15px 40px;
        color: #fff !important;
        border: none;
        border-radius: 0;
        font-weight: bolder;
        background: #ec7a5c;
    }
    .stepper-controls a:hover{
        background: #d96e56;
    }



    .stepper{
        width: 100%;
        padding: 30px;
        height: 500px;
        box-shadow: 0 3px 8px -6px rgba(0,0,0,.50);
    }

    .tools h4{
        display: inline-block;
        margin: 20px;
    }

    .tools button{
        padding: 10px 15px;
        color: #fff !important;
        border: none;
        font-size: 15px;
        border-radius: 0;
        display: inline-block !important;
        font-weight: bolder;
        background: #ec7a5c;
    }

    .quanControl{
        display: inline;
        border: 1px solid #efefef;
        padding: 10px;
        float: none;
    }


    .quanInput{
        width: 50px ;
        height:50px;
        display: inline-block ;
        color: #000 ;
        font-size: 18px;
        text-align: center;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
    }


    .table-data{
        padding: 20px;
    }

    .table-data .row{
        margin: 20px 0;
        overflow-x: auto;
    }

    .table-data .img-box img{
        width: 100%;
        object-fit: contain;
    }

    .table-data .img-box{
        width: 120px;
    }

</style>

<script>

    import {mapActions,mapGetters, mapMutations} from 'vuex'

    export default {

        data(){
            return{
                stepper:1,
                prevCanMove: false,
                nextCanMove: true,
            }
        },

        watch:{
          stepper: function (val) {
              this.$emit('update:stepper', val)
          }
        },

        computed:{

            ...mapGetters('Cart',[
                'cartTotal',
                'cartProducts',
                // ...
            ])
        },

        created(){
            this.setCart()
        },
        methods:{

            ...mapActions('Cart',['removeProductCart','addCleanProductToCart']),
            ...mapMutations('Cart',{
                setCart: 'setCart' // map `this.add()` to `this.$store.commit('increment')`
            }),


            increaseQuantity(item){
                const newCart = this.cartProducts.filter(currentItem => currentItem.product_id === item.product_id);
                const product = newCart[0];
                product.quantity++;
                product.totalPrice = product.price * product.quantity;
            },
            decreaseQuantity(item){
               if(item.quantity > 0){
                   const newCart = this.cartProducts.filter(currentItem => currentItem.product_id === item.product_id);
                   const product = newCart[0];
                   product.quantity--;
                   product.totalPrice = product.price * product.quantity;
               }
            },

            UpdateCart(){
                this.addCleanProductToCart(this.cartProducts);

                this.$swal({
                    title:'Cart has been updated',
                    text:'Click Finish to create An account or Sign in',
                    type:'success',
                });

            },
            removeItem(item){
                this.removeProductCart(item, item);
                this.setCart()
            }

        }
    }

</script>