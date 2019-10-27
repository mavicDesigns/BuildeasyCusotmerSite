<template>

    <div>

        <header-x></header-x>

        <section class="formSection">

            <div class="">
                <vs-row vs-justify="space-around">

                    <vs-col vs-lg="6" vs-sm="12" vs-xs="12" class="pad_70">

                        <h1 class="fs-big font-weight-bold">Let's take Construction Mobile</h1>
                        <p>Air seed winged lights saw kind whales in sixth dont seas dron image so fish all tree meat dont there is seed winged lights saw kind whales in sixth dont seas dron image so fish all tree meat dont there</p>


                    </vs-col>
                    <vs-col vs-lg="4" vs-sm="12" vs-xs="12">

                        <vs-card actionable>
                            <form style="padding: 20px" @submit.prevent="register">
                                <div class="form-group">

                                    <div class="tooltiper" >
                                        <vs-input
                                                :danger=" respError.email.length > 0"
                                                @input="$v.newUser.name.$touch();"
                                                :success="!$v.newUser.name.$invalid"
                                                :danger-text="respError.email.length > 0 ? respError.email[0] : 'Some thing went Wrong'"
                                                style="width: 100%" size="large" v-model="newUser.name" color="primary" label="Full Name" placeholder="Full Name"></vs-input>
                                        <transition name="bounce">
                                            <span class="tooltipSpanX" v-if="respError.name.length > 0">{{respError.name[0]}}</span>
                                        </transition>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="tooltiper" >
                                        <vs-input
                                                :danger="$v.newUser.email.$error"
                                                @input="$v.newUser.email.$touch();"
                                                :success="!$v.newUser.email.$invalid"
                                                :danger-text="!$v.newUser.email.required ? 'This input is required' : 'This is not a valid Email Address' "
                                                style="width: 100%" size="large" v-model="newUser.email" color="primary" label="Email" placeholder="example@gmail.com"></vs-input>
                                        <transition name="bounce">
                                            <span class="tooltipSpanX" v-if="respError.email.length > 0">{{respError.email[0]}}</span>
                                        </transition>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="tooltiper" >
                                        <vs-input
                                                :danger="$v.newUser.password.$error"
                                                @input="$v.newUser.password.$touch();"
                                                :success="!$v.newUser.password.$invalid"
                                                :danger-text="!$v.newUser.password.PasswordValidator ? 'Password must Contain at least one letter, an Alphabeth' : 'Password should be more than 6 letters' "
                                                style="width: 100%" type="password" v-model="newUser.password" size="large" color="primary" label="Password" placeholder="Create a Password"></vs-input>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <input type="checkbox" id="terms" v-model="newUser.terms_conditions" /><label for="terms"> I agree to terms and Conditons bla bla bla.....</label>
                                </div>

                                <div class="form-group" align="left">
                                    <vs-button :disabled="this.$v.newUser.$invalid" style="width: 100%"  size="large" color="primary" >Sign-up</vs-button>
                                </div>
                            </form>
                        </vs-card>

                    </vs-col>

                </vs-row>
            </div>

        </section>
    </div>


</template>
<style>


    .bounce-enter-active {
        -webkit-animation-name: bounceInLeft;
        animation: fadeInUp .5s ;
    }
    .bounce-leave-active {
        -webkit-animation-name: bounceInLeft;
        animation: fadeInDown .5s reverse;
    }




    .formSection{
        margin-top: 100px;
        padding: 50px ;
    }

    @media (max-width: 576px){
        .formSection{
            padding: 10px;
            margin-top: 0;
        }
    }

    .tooltiper{
        position: relative;
    }

    .tooltipSpanX{
        visibility: visible;
        width: auto;
        text-align: center;
        color: #323232;
        padding: 10px ;
        word-wrap: no-wrap;
        box-shadow: 1px 1px 20px #aaa;
        border-radius: 5px;
        border: 1px solid #bc0000;
        background: #fff;
        bottom:70px;
        z-index: 2;
        white-space: nowrap;
        position: absolute;
        left: 30%;
        font-size: 0.9em;

    }
    .tooltipSpanX::after{
        content: " ";
        position: absolute;
        display: block;
        margin-left: -5px;
        border: 7px solid ;
        border-color: #bc0000 transparent transparent transparent ;
        left: 20%;
        background: none !important;
        bottom:-15px;
    }
</style>

<script>

    import { required, minLength,sameAs ,between, email } from 'vuelidate/lib/validators'
    import HeaderX from '../../components/header/index.vue'
    import axios from 'axios'

    export default {

        components: {HeaderX},
        component:{
            HeaderX
        },

        validations: {
            newUser: {
                name: {
                    required,
                    minLength: minLength(5)
                },

                email: {
                    email,
                    required
                },

                terms_conditions: {
                    sameAs: sameAs (() => true)
                },
                password:{
                    required,
                    minLength: minLength(6)
                }
            }
        },

        data(){
            return{
                newUser:{
                    name: '',
                    email: '',
                    password: '',
                    terms_conditions: false,
                },
                respError:{
                    email:[],
                    name: []
                },
                isloading: false,
            }
        },
        methods:{
            register(){

                if(!this.$v.newUser.$invalid){
                    this.respError.email = [];
                    this.respError.name = [];
                    this.isloading = true;
                    const self = this;


                    axios.post(this.baseUrl+'/api/createUser?api_key='+ this.apiKey,JSON.stringify(self.newUser))
                        .then((resp) => {
                            let email = resp.data.user.email;
                            let password = self.newUser.password;
                            self.$store.commit('setNewUser',self.newUser);
                            self.$store.dispatch('login',{email, password}).then(() => self.$router.push('/register/path_2')).catch((err) => { self.$router.push('/login')})
                        })
                        .catch((err) => {
                            NProgress.done();
                            let errorObj = err.response.data.error_message;
                            self.respError.email.push(errorObj.email[0]);
                            self.respError.name.push(errorObj.name[0]);


                        })
                }
            }
        }
    }
</script>