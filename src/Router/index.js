
import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'
import store from '../store/index'


Vue.use(Router);

const router = new Router({ routes: routes });


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters['Auth/isAuthenticated']){
            next();
            return
        }
        next('/login?next=' + to.path)
    }else {
        next()
    }




});


export default router;