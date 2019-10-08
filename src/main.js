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




Vue.use(Vuelidate);
Vue.use(Vuesax);
Vue.config.productionTip = false;
axios.defaults.withCredentials = false;

new Vue({
    router: router,
    store,
    render: h => h(App),
}).$mount('#app');
