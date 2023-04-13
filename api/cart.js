import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";

export function getProductsCart(){
    const cart = localStorage.getItem(CART);

    if(!cart) {
        return null;
    }else {
        const products = cart.split(",");
        return products;
    }
}

export function addProductCart(product){
    const cart = getProductsCart();

    if(!cart){
        localStorage.setItem(CART, product);
        toast.success("Producto añadido al carrito");
    }else{
        const productFound = includes(cart, product);
        if(productFound){
            toast.warning("El producto ya ha sido añadido al carrito");
        }else{
            cart.push(product);
            localStorage.setItem(CART, cart);
            toast.success("Producto añadido correctamente");
        }
    }
}

export function countProductsCart(){
    const cart = getProductsCart();

    if(!cart){
        return;
    }else{
        return size(cart);
    }
}