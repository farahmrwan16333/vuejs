<template>
    <div class="container">
        <div class="row">
            <div class="col-12 title mb-5">
                <h1>Edit Product</h1>
            </div>
            <app-form>
                <form @submit.prevent="onSubmit">
                    <MDBRow class="mb-4">
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Title"
                                v-model="title"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Category"
                                v-model="category"
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBInput
                        type="text"
                        label="Brand"
                        v-model="brand"
                        wrapperClass="mb-4"
                    />

                    <MDBRow class="mb-4">
                        <MDBCol>
                            <MDBInput
                                type="number"
                                label="Price"
                                v-model="price"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="number"
                                label="Discount"
                                v-model="discount"
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBTextarea
                        label="Description"
                        v-model="description"
                        wrapperClass="mb-4"
                    />

                    <MDBBtn color="primary" block class="mb-4" type="submit">
                        Edit Product
                    </MDBBtn>
                </form>
            </app-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import AppForm from "../../components/AppForm.vue";

import {
    MDBInput,
    MDBCheckbox,
    MDBTextarea,
    MDBBtn,
    MDBRow,
    MDBCol,
} from "mdb-vue-ui-kit";

export default {
    name: "EditProfile",
    components: {
        AppForm,
        MDBInput,
        MDBCheckbox,
        MDBTextarea,
        MDBBtn,
        MDBRow,
        MDBCol,
    },
    props: ["id"],
    data() {
        return {
            product: null,
            title: "",
            category: "",
            price: null,
            discount: null,
            description: "",
            brand: "",
        };
    },
    methods: {
        onSubmit() {
            if (
                !this.title ||
                !this.description ||
                !this.discount ||
                !this.brand ||
                !this.category ||
                !this.price
            ) {
                this.$toast.open({
                    message: `You must fill all the form first!`,
                    type: "error",
                    duration: 3000,
                });
            } else {
                axios
                    .post(
                        `https://admin-mfyg726r7q-uc.a.run.app/products/updateProduct?productId=${this.id}&title=${this.title}&description=${this.description}&discountPercentage=${this.discount}&brand=${this.brand}&category=${this.category}&price=${this.price}`
                    )
                    .then((res) => {
                        this.$toast.open({
                            message: `${this.title} Product has been added successfully!`,
                            type: "success",
                            duration: 3000,
                        });
                        this.redirect();
                    });
            }
        },
        redirect() {
            this.$router.push({
                name: "ProductDetails",
                params: { id: this.id },
            });
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
                this.title = product.title;
                this.category = product.category;
                this.price = product.price;
                this.discount = product.discount;
                this.description = product.desc;
                this.brand = product.brand;
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
