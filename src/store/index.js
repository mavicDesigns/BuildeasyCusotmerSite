import Vuex from 'vuex'
import Vue from 'vue'
import {Auth} from "./modules/auth"
import {Cart} from "./modules/cart"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        Auth,
        Cart,
    }
});