
import {http} from '../../_helpers/http/http'
import { mapState} from 'vuex'

export const Orders = {
    namespaced: true,
    state: {
        ...mapState('Auth', {
            user:state => state.user
        }),

        status: '',
    },

    mutations: {
        received(state){
            state.status = 'done'
        }
    },

    getters: {},
    actions: {

         getOrders({commit},user_id) {


            return new Promise((resolve, reject) => {
                http.get(
                    "customers/data/orders?api_key=4ntbqhy2g0mc&page=1&limit=10&buyers_id="+ user_id
                )
                    .then(response => {
                        alert(JSON.stringify(response.data.buyers_orders.data));
                        commit('received');
                        resolve(response.data.buyers_orders.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

    }

}