<template>

    <div class="model mt-5  store">

        <div class="title-bar" align="center">
            <h1>Related Products</h1>
        </div>

        <div class="container">
            <div class="row">

                <div v-for="product in products" :key="product" class="col-lg-3 col-md-6 col-sm-2">
                    <div class="product-col">
                        <div class="product-img">
                            <img :src="product.images[0].src" />
                            <div class="qick-view-button">
                                <a class="btn btn-block btn-danger">Quick view</a>
                            </div>
                        </div>
                        <div class="product-details">
                            <h5> <router-link :to="'/product/'+product.title+'/'+product.product_id">{{product.title}}</router-link></h5>
                            <h6>&#8358; {{product.price}}</h6>
                            <div class="hover-area">
                                <a href="javascript:void(0)" @click="addToCart(product)" class="cart-button">Add To Cart</a>
                            </div>
                        </div>
                    </div>
                </div>

                <content-loader v-if="isLoading == true"
                                :height="475"
                                :width="900"
                                :speed="2"
                                primaryColor="#f3f3f3"
                                secondaryColor="#ecebeb"
                >
                    <rect x="12.69" y="69" rx="5" ry="5" width="256" height="332" />
                    <rect x="295.69" y="65" rx="5" ry="5" width="256" height="332" />
                    <rect x="577.69" y="62" rx="5" ry="5" width="256" height="332" />
                </content-loader>



            </div>



        </div>

    </div>

</template>
<style>


     .title-bar h1{
        font-weight: 900;
    }

    .product-col{
        height: 400px;
        width:100%;
        margin:40px 10px;
    }
    .product-img{
        position: relative;
    }

    .product-col .product-img{
        width: 100%;
        margin-bottom: 5px;
        height: 350px;
        display: block;
        overflow: hidden;
    }
    .product-col .product-img img{
        width: 100%;
        height: 350px;
        transition: all ease 0.3s;
        object-fit: cover;
    }
    .product-col:hover .product-img > img{
        transform: scale(1.1);
    }

    .product-col .product-details{
        position: relative;
    }

    .product-col .product-details .hover-area{
        position: absolute;
        background: white;
        opacity: 0;
        transform: translateY(10px);
        visibility: hidden;
        transition: all ease 0.3s;
        bottom: 0;
    }
    .product-col:hover  .hover-area{
        visibility: visible;
        transform: translateY(0);
        opacity: 1;
    }
    .product-details > h6{
        transition: all ease 0.3s;
        color: #b8b8b8;
        font-weight: 600;
    }

    .product-col:hover .product-details > h6{
        transform: translateY(-20px);
        visibility: hidden;
        z-index: -1;
        opacity: 0;

    }
    .qick-view-button{
        position: absolute;
        visibility: hidden;
        background: white;
        opacity: 0;
        transition: all ease 0.5s;
        bottom: 0;
        margin-bottom: 0;
        width: 100%;
    }

    .qick-view-button a{
        border-radius: 0;
        transition: all ease 0.5s;
        color: #721c24 !important;
        background: transparent;
        border: none;
        font-weight: bolder;
        font-size: 18px;
        box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
    }

    .qick-view-button a:hover{
        background: transparent;
    }



    .product-col:hover  .qick-view-button{
        visibility: visible;
        opacity: 1;
    }

    .product-col .product-details .cart-button{
        color: #c30000;
        font-size: 15px;
        font-weight: bold;
    }

</style>

<script>
    import {http} from '../../_helpers/http/http'
    import {mapActions} from 'vuex'
    import { ContentLoader } from 'vue-content-loader'



    export default {

        components:{
            ContentLoader
        },
        props:['product'],

        mounted(){
            this.$emit('titleChanged', '');
            this.getProducts();
        },

        data(){
            return{
                products:[],
                currentPage: 1,
                isLoading:false,
            }
        },

        methods:{

            ...mapActions('Cart', ['addProductToCart']),



            addToCart(product){

                this.addProductToCart(product);

                this.$swal({
                    title: 'Done',
                    text:  product.title + ' has been added to cart',
                    type: 'success',
                    confirmButtonText: 'continue',
                })
            },

            getProducts(){

                const self = this;
                this.isLoading = true;

                http.get('products?api_key=4ntbqhy2g0mc&limit=1&page=' + self.currentPage)
                    .then((response) => {
                        let reData = response.data.allProducts.data;
                        if(reData.length < 1){
                            self.currentPage--;
                        }
                        self.products = [...self.products, ...response.data.allProducts.data];
                        self.isLoading = false;
                    }).catch(() => {

                    self.isLoading = false;


                })

            },


        }
    }

</script>