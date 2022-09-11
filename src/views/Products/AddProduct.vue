<template>
    <div class="container">
        <div class="row">
            <div class="col-12 title mb-5">
                <h1>Add a Product</h1>
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
                        Add Product
                    </MDBBtn>
                </form>
            </app-form>
        </div>
    </div>
</template>

<script>
import AppForm from "../../components/AppForm.vue";

import axios from "axios";
import {
    MDBInput,
    MDBCheckbox,
    MDBTextarea,
    MDBBtn,
    MDBRow,
    MDBCol,
} from "mdb-vue-ui-kit";

export default {
    name: "AddProduct",
    props: ["product"],
    components: {
        AppForm,
        MDBInput,
        MDBCheckbox,
        MDBTextarea,
        MDBBtn,
        MDBRow,
        MDBCol,
    },
    data() {
        return {
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
                        `https://admin-mfyg726r7q-uc.a.run.app/products/createProduct?title=${this.title}&description=${this.description}&discountPercentage=${this.discount}&brand=${this.brand}&category=${this.category}&price=${this.price}&thumbnail=https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg`
                    )
                    .then(() => {
                        this.$toast.open({
                            message: `${this.title} Product has been added successfully!`,
                            type: "success",
                            duration: 3000,
                            onClick: this.redirect,
                        });
                    });
            }
        },
        redirect() {
            this.$router.push({ name: "Products" });
        },
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
