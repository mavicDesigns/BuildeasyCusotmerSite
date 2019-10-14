import {http} from "../../_helpers/http/http";

export const Auth = {
    namespaced: true,
    state: {
        user: {},
        token: localStorage.getItem('token'),
        status: ''
    },
    mutations: {
        AUTH_SUCCESS: (state, token) => {
            state.status = 'success';
            state.token = token
        },

        AUTH_REQUEST: (state) => {
            state.status = 'Loading';
        },

        AUTH_ERROR: (state) => {
            state.status = 'Error';
        },

        AUTH_LOGOUT: (state) => {
            state.token = ''
        },

        USER_REQUEST: (state, user) => {
            state.user = user
        }
    },
    getters:{
      isAuthenticated: state => !!state.token,
      authStatus: state => state.status,
        getUser: state => state.user
    },
    actions:{
        AUTH_REQUEST: ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => {

                http({url: '/customers/users/authenticate?api_key=sk', data: JSON.stringify(user), method: 'POST'})
                    .then(response => {
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        commit('AUTH_SUCCESS', token); // Add token to state
                        dispatch('USER_REQUEST');
                        resolve(response);
                    })
                    .catch(err => {
                        commit('AUTH_ERROR', err);
                        localStorage.removeItem('token');
                        reject(err)
                    })

            })
        },

        AUTH_LOGOUT: ({commit}) => {
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT');
                localStorage.removeItem('token');


                resolve()
            })
        },

        USER_REQUEST: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                http({url: "customers/users/getAuthenticated?api_key=wQtATJ9qgge9N347sWM6&token=" +
                localStorage.getItem("token"), method:'GET'})
                    .then(resp => {
                        commit('USER_REQUEST', resp.data.user);
                        resolve(resp.data.user)
                    })
                    .catch(err => {
                        dispatch('AUTH_LOGOUT');
                        reject(err);
                    });
            })
        }
    }
};
