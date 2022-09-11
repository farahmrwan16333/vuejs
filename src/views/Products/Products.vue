<template>
    <div class="row justify-content-center align-items-start">
        <div class="col-12 title mb-5">
            <h1>Products List</h1>
        </div>
        <div class="row">
            <div
                class="col-3 mb-4"
                v-for="product in products"
                :key="product.id"
            >
                <product
                    :product="product"
                    @update-products="deleteProduct"
                    class="h-100"
                ></product>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Product from "../../components/Product.vue";
export default {
    name: "Products",
    components: {
        Product,
    },
    data() {
        return {
            products: [],
        };
    },
    methods: {
        getAllProducts() {
            axios
                .get(
                    "https://admin-mfyg726r7q-uc.a.run.app/products/getProducts"
                )
                .then((res) => {
                    const {
                        data: [{ data: products }],
                    } = res;
                    this.products = products;
                })
                .catch((err) => console.error(err));
        },
        deleteProduct(id) {
            axios
                .get(
                    `https://admin-mfyg726r7q-uc.a.run.app/products/deleteProduct?productId=${id}`
                )
                .then((res) => {
                    const { status } = res;
                    if (status === 200) {
                        this.$toast.open({
                            message: `${this.title} Product has been deleted Successfully`,
                            type: "success",
                            duration: 3000,
                        });
                        this.getAllProducts();
                    }
                })
                .catch((err) => console.log(err));
        },
    },
    mounted() {
        this.getAllProducts();
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
