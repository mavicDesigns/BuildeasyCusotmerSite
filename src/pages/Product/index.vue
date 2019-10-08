<template>
    <div class="model product">

        <div class="container">
            <div class="row">


                <div class="image-slide ">
                    <div style="width:500px;height:500px" class="pic-box">
                        <pic-zoom :url="imageView" :scale="2"></pic-zoom>


                    </div>
                    <br>
                    <slick class="image-col" :options="slickOptions">
                        <img v-for="image in product.images" :key="image" :src="image.src" @click="getImage(image.src)"/>
                    </slick>
                </div>
                <div class="content-slide">
                   <div class="prod-details">
                       <div class="prod-title mt-4">
                           <h1> {{product.title}}</h1>
                       </div>
                       <div class="prod-price mt-4">
                           <h3>&#8358; {{product.price}}</h3>
                       </div>
                       <div class="prod-text mt-4">
                           <p>{{product.description}}</p>
                       </div>

                       <div class="prod-controls">
                           <div class="prod-q">
                               <span><i class="fas fa-plus"></i> </span><span class="quan">5</span> <span><i class="fas fa-minus"></i></span>
                           </div>
                           <div class="prod-button"><a href="javascript:void(0)" @click="addProductToCart(product)" class="btn btn-danger btn-block">Add To Cart</a> </div>
                       </div>
                   </div>
                </div>

            </div>
        </div>


    </div>
</template>
<style>

    .prod-controls .prod-q, .prod-button{
        display: inline-block;
        padding: 20px auto;
    }
    
    .prod-button a{ 
        padding: 15px 20px;
        color: #fff !important;
        border: none;
        border-radius: 0;
        font-weight: bolder;
        background: #ec7a5c;
    }
    .prod-button a:hover{
        background: #d96e56;
    }

    .image-slide{
        display: inline-block;
        width: 60%;
    }

    .content-slide{
        display: inline-block;
        width: 40%;
    }


    .prod-controls .prod-q{
        width: 150px;
    }

    .prod-controls .prod-q span{
        font-size: 30px;
        margin: auto 10px;
    }

    .prod-button{
        width: 200px;
    }

    .prod-details{
        padding: 30px ;
    }

    .prod-details h1{
        font-size: 65px;
    }
    .prod-details h3{
        font-weight: bolder;
        color: #ec7a5c;
    }
    .mouse-cover{
        position: absolute;
    }
</style>

<script>

    import {http} from '../../_helpers/http/http'
    import {mapActions} from 'vuex'
    import PicZoom from 'vue-piczoom'
    import Slick from 'vue-slick'




    export default {
        components:{
          PicZoom,
          Slick
        },

        created(){
            if(!this.$route.params.id){
                this.$router.push('/')
            }else {
                this.getProduct()
            }
        },

        mounted(){
            this.$emit('titleChanged', '')
        },

        data(){
            return{
                product:{
                },
                imageView:'',
                isLoading: false,
                slickOptions:{
                    slidesToShow:4,
                    prevArrow: '.prevArrow',
                    nextArrow: '.nextArrow',
                }
            }
        },

        methods:{
            ...mapActions('Cart', ['addProductToCart']),
            getImage(val){
                this.imageView =  val
            },


            getProduct(){

                this.isLoading = true;
                const self = this;

                http.get('/products/'+ self.$route.params.id+'?api_key=4ntbqhy2g0mc')
                    .then(function (response) {
                        if(response.data){

                            self.product = response.data.current_product;
                            self.getImage(self.product.images[0].src)

                        }else {
                            self.$router.push('/');
                        }
                    })
                    .catch(function () {
                        self.$router.push('/');
                    })
                    .finally(() => {
                        self.isLoading = false;
                    })

            },
        }
    }

</script>