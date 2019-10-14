
import {http} from '../../_helpers/http/http'

export const Cart = {
    namespaced: true,
    state:{
        cart: [],
    },

    mutations:{

        setCart(state) {
            state.cart = JSON.parse(localStorage.getItem("carts")) || [];
        },
        setTemporaryAddress(state, address){

            state.address = address
        },
    },

    getters:{
        cartProducts(state) {
            return state.cart;
        },

        cartTotal(state) {
            return state.cart.length;
        }
    },
    actions:{


        placeOrder({ state }, user) {
            const cart = state.cart;
            return new Promise((resolve, reject) => {


                let cartLoad = [];
                let payload = state.address;

                //Iterate through cart and place each
                cart.forEach(async item => {
                    //Set Order object
                    const order = {
                        buyer: user.firstName + user.lastName,
                        buyer_id: user.user_id,
                        destination: "place_id:" + payload.place_id,
                        supplier_id: item.supplier_id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.price
                    };
                    cartLoad.push(order);
                });

                http({
                    url: "/createOrder?api_key=56y",
                    data: JSON.stringify(cartLoad),
                    method: "POST"
                })
                    .then(res => {

                        resolve(res)
                    })
                    .catch(err => {
                        alert(JSON.stringify(err));
                        reject(err);
                    });

            });
        },

        addProductToCart: ({ commit }, product) => {
            if (localStorage.getItem("carts") === null) {
                const cart = [];
                product.quantity = 1;
                product.totalPrice = parseInt(product.price);
                cart.push(product);
                localStorage.setItem("carts", JSON.stringify(cart));
            } else {
                const cart = JSON.parse(localStorage.getItem("carts"));

                const existingProduct = cart.filter(
                    item => item.product_id === product.product_id
                );

                if (existingProduct.length > 0) {
                    existingProduct[0].quantity++;
                    existingProduct[0].totalPrice =
                        parseInt(product.price) * existingProduct[0].quantity;
                } else {
                    product.quantity = 1;
                    product.totalPrice = parseInt(product.price);
                    cart.push(product);
                }

                localStorage.setItem("carts", JSON.stringify(cart));
            }

            commit("setCart");
        },
        removeProductCart: ({ commit }, product) => {
            const cart = JSON.parse(localStorage.getItem("carts"));

            const filteredCart = cart.filter(
                item => item.product_id !== product.product_id
            );

            localStorage.setItem("carts", JSON.stringify(filteredCart));
            commit("setCart");
        },
        addCleanProductToCart: ({ commit }, cart) => {
            localStorage.setItem("carts", JSON.stringify(cart));
            commit("setCart");
        },

    }
};