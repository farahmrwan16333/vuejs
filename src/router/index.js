import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products/Products.vue";
import Cart from "../views/Cart.vue";
import Wishlist from "../views/Wishlist.vue";
import NotFound from "../views/NotFound.vue";
import AddProduct from "../views/Products/AddProduct.vue";
import EditProduct from "../views/Products/EditProduct.vue";
import ProductDetails from "../views/Products/ProductDetails.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/products",
        name: "Products",
        component: Products,
    },
    {
        path: "/products/product-details/:id",
        name: "ProductDetails",
        component: ProductDetails,
    },
    {
        path: "/add-product",
        name: "AddProduct",
        component: AddProduct,
    },
    {
        path: "/edit-product/:id",
        name: "EditProduct",
        component: EditProduct,
        props: true,
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
    },
    {
        path: "/wishlist",
        name: "Wishlist",
        component: Wishlist,
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
