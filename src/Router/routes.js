import Layout from '../pages/Layout/index.vue'
import HomePage from '../pages/HomePage/index.vue'
import Store from '../pages/Store/index.vue'
import Product from '../pages/Product/index.vue'
import Checkout from '../pages/Checkout/index.vue'
import Login from '../pages/Login/index.vue'

import DashboardLayout from '../pages/Dashboard/layout.vue'
import Dashboard from '../pages/Dashboard/index.vue'
import Order from '../pages/Orders/index.vue'
import Register from '../pages/Register/index.vue'
import OrderView from '../pages/Orders/view.vue'



export const routes = [
    {
        path: "/",
        name: "Layout",
        component: Layout,
        children: [
            { path: "/", name: "home", component: HomePage,},
            { path: "/store", name: "store", component: Store,},
            { path: "/checkout", name: "checkout", component: Checkout,},
            { path: "/product/:title/:id", name: "detail", component: Product },

        ]
    },
    { path: "/login", name: "login", component: Login,},
    { path: "/Register", name: "register", component: Register,},
    {
        path: "/dashboard",
        component: DashboardLayout,
        children: [
            { path: "/", name: "dashboard", component: Dashboard,},
            { path: "orders", name: "orders", component: Order,},
            { path: "orders/:order_id", name: "orderView", component: OrderView,},

        ],
        meta: { requiresAuth: true },
    },

];
