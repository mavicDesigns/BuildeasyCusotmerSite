<template>

    <div class="model">

        <div class="login-page">
            <div class="login-inner">
                <div class="title-header">
                    <h3>Login</h3>
                </div>

                <form class="form" @submit.prevent="login">
                    <div class="form-group">
                        <span v-if="error" class="error ">{{error}}</span>
                    </div>

                    <div class="form-group">
                        <input type="text" v-model="user.email" class="form-control" placeholder="username"/>
                    </div>

                    <div class="form-group">
                        <input type="password" v-model="user.password"  class="form-control" placeholder="Password"/>
                    </div>

                    <div class="form-group" align="center">
                        <button type="submit" class="btn btn-primary">
                            <span v-if="isLoading == false">Login</span>
                            <span v-if="isLoading == true">Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>

</template>
<style>


    .login-page{
        width: 100%;
        height: 100%;
        position: relative;
        background: white;
    }

    .login-page .login-inner{
        position: absolute;
        padding: 50px;
        left: 25%;
        margin: 0;
        box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
        width: 50%;
        background: rgba(227, 227, 227, 0.79);
        height: 300px;
    }

    .login-inner .error{
        width: 100%;
        background: #c10000;
        color: white;
        padding: 10px;
        margin: 30px auto;
        text-align: center;
    }

    .login-inner .btn{
        width: 150px;
    }
</style>

<script>



    import {mapActions} from "vuex";

    export default {
        data(){
            return{
                user:{
                    email: '',
                    password: ''
                },
                error: '',
                isLoading: false,
            }
        },

        methods:{
            ...mapActions('Auth', ['AUTH_REQUEST']),

            login(){
                let user = this.user;
                this.AUTH_REQUEST(user)
                    .then(() => {
                       this.$router.push('/dashboard')
                    })
                    .catch(() => {
                        this.error = "Username or Password not correct"
                    })


            }

        }
    }
</script>