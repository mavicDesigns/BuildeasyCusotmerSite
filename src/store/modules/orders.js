
import {http} from '../../_helpers/http/http'
import {mapActions, mapState} from 'vuex'

export const Orders = {
    namespaced: true,
    state: {
        ...mapState('Auth', {
            user:state => state.user
        })
    },

    mutations: {},

    getters: {},
    actions: {
        ...mapActions('Auth', ['USER_REQUEST']),

        async getOrders({dispatch, state}) {

            await dispatch('USER_REQUEST');

            return new Promise((resolve, reject) => {
                http.get(
                    "/customers/data/orders?&page=1&limit=5&buyers_id=" + state.user.user_id + "&api_key=shs"
                )
                    .then(response => {
                        alert(JSON.stringify(response.data.buyers_orders.data))
                        resolve(response.data.buyers_orders.data);
                    })
                    .catch(err => {
                        alert(JSON.stringify(err))
                        reject(err);
                    });
            });
        },

    }

}