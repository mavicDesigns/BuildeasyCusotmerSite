export function isInCart(product) {

    let cart = JSON.parse(localStorage.getItem("carts")) || [];

    const existingProduct =  cart.filter(
        item => item.product_id === product.product_id
    );

    if (existingProduct.length > 0) {
        return "Added to Cart"
    } else {
        return "Add To Carts"

    }
}