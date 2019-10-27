import Vue from 'vue'
import App from './App.vue'
import router from './Router'
import store from './store'
import "slick-carousel/slick/slick.css";
import Vuelidate from "vuelidate";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "material-design-icons/iconfont/material-icons.css";
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import {isInCart} from './_helpers/Cart'
import {currency} from './_helpers/filters/currency'
import {status} from './_helpers/filters/status'




const options = {
    confirmButtonColor: "#41b882",
    cancelButtonColor: "#ff7674"
};

Vue.filter('isInCart',isInCart);
Vue.filter("currency", currency);
Vue.filter("status", status);
Vue.use(VueSweetalert2, options);
Vue.use(Vuelidate);
Vue.use(Vuesax);
Vue.config.productionTip = false;
axios.defaults.withCredentials = false;


new Vue({
    router: router,
    store,
    render: h => h(App),
}).$mount('#app');
