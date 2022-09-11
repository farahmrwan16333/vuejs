<template>
    <div class="container">
        <div class="row">
            <div class="col-12 title mb-5">
                <h1>{{ product.title }}</h1>
            </div>
            <div class="col-12 text-center">
                <img
                    :src="product.thumbnail"
                    :alt="product.title"
                    class="w-50 mb-4"
                />
                <h2>Brand: {{ product.brand }}</h2>
                <h4 class="mb-4">Category: {{ product.category }}</h4>
                <p class="mb-5">{{ product.desc }}</p>
                <div class="mb-5">
                    <h4>
                        Price:
                        <span class="text-decoration-line-through text-danger">
                            {{ product.price }}$
                        </span>
                    </h4>
                    <h4>Discound: {{ product.discount }}%</h4>
                    <h3>
                        Final Price:
                        <span class="text-success">{{ calcPrice }}$ </span>
                    </h3>
                </div>
                <div class="mb-5">
                    <MDBBtn
                        color="primary"
                        class="mb-4"
                        type="button"
                        @click="addToWishlist"
                    >
                        Add to Wishlist
                    </MDBBtn>
                    <MDBBtn color="primary" class="mb-4" type="button">
                        Add to Cart
                    </MDBBtn>
                    <MDBBtn
                        color="info"
                        class="mb-4"
                        type="button"
                        @click="
                            $router.push({
                                name: 'EditProduct',
                                params: { id: product.id },
                            })
                        "
                    >
                        Edit Product
                    </MDBBtn>
                    <MDBBtn
                        color="danger"
                        class="mb-4"
                        type="button"
                        @click="deleteProduct"
                    >
                        Delete Product
                    </MDBBtn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { MDBBtn } from "mdb-vue-ui-kit";

export default {
    name: "ProductDetails",
    components: {
        MDBBtn,
    },
    data() {
        return {
            id: this.$route.params.id,
            product: {},
        };
    },
    methods: {
        deleteProduct() {
            axios
                .get(
                    `https://admin-mfyg726r7q-uc.a.run.app/products/deleteProduct?productId=${this.id}`
                )
                .then((res) => {
                    const { status } = res;
                    if (status === 200) {
                        this.$toast.open({
                            message: `${this.title} Product has been deleted Successfully`,
                            type: "success",
                            duration: 3000,
                        });
                        this.$router.push({ name: "Products" });
                    }
                })
                .catch((err) => console.log(err));
        },
        addToWishlist() {
            if (localStorage.getItem("products")) {
                // const exProducts = JSON.parse(localStorage.getItem("products"));
                // console.log(exProducts);
                // console.log(this.product);
                // console.log(exProducts.indexOf(this.product));
                // if (exProducts.indexOf(this.product) === -1) {
                //     console.log("includes");
                //     this.$toast.open({
                //         message: `${this.product.title} Product has been already added to Wishlist`,
                //         type: "error",
                //         duration: 3000,
                //     });
                // } else {
                //     console.log("add");
                //     exProducts.push(this.product);
                //     localStorage.setItem(
                //         "products",
                //         JSON.stringify(exProducts)
                //     );
                //     this.$toast.open({
                //         message: `${this.product.title} Product has been added to Wishlist`,
                //         type: "success",
                //         duration: 3000,
                //     });
                // }
            } else {
                const products = [];
                products.push(this.product);
                localStorage.setItem("products", JSON.stringify(products));
                this.$toast.open({
                    message: `${this.product.title} Product has been added to Wishlist`,
                    type: "success",
                    duration: 3000,
                });
            }
        },
    },
    computed: {
        calcPrice() {
            const finalPrice =
                this.product.price -
                (this.product.price * this.product.discount) / 100;
            if (finalPrice <= 0) {
                return `Free`;
            } else {
                return `${finalPrice.toFixed(2)}`;
            }
        },
    },
    created() {
        axios
            .get(
                `https://admin-mfyg726r7q-uc.a.run.app/products/getProduct?productId=${this.id}`
            )
            .then((res) => {
                const {
                    data: [{ data: product }],
                } = res;
                this.product = product;
            })
            .catch((err) => console.log(err));
    },
};
</script>

<style scoped>
.title {
    background-color: rgb(175, 172, 172);
    border-radius: 5px;
    text-align: center;
}
.title h1 {
    color: #fff;
    padding: 20px 0;
    margin: 0;
}
</style>
