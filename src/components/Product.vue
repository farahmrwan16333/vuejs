<template>
    <router-link
        :to="{ name: 'ProductDetails', params: { id: product.id } }"
        class="d-flex justify-content-center align-items-center"
    >
        <MDBCard>
            <MDBCardImg
                :src="product.thumbnail"
                top
                :alt="product.title"
                style="height: 200px"
            />
            <MDBCardBody>
                <MDBCardTitle>{{ spliceTitle }}</MDBCardTitle>
                <MDBCardTitle>{{ product.category }}</MDBCardTitle>
                <MDBCardText style="height: 100px" class="m-0">
                    {{ spliceDesc }}
                </MDBCardText>
                <div class="h-100 d-flex align-items-end justify-content-end">
                    <MDBBadge badge="info" pill>{{ product.price }} $</MDBBadge>
                </div>
                <div class="mt-4">
                    <MDBBtn
                        color="primary"
                        class="me-2"
                        type="button"
                        @click.prevent="
                            this.$router.push({
                                name: 'EditProduct',
                                params: { id: product.id },
                            })
                        "
                    >
                        Edit
                    </MDBBtn>
                    <MDBBtn
                        color="danger"
                        type="button"
                        @click.prevent="deleteProduct"
                    >
                        Delete
                    </MDBBtn>
                </div>
            </MDBCardBody>
        </MDBCard>
    </router-link>
</template>

<script>
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImg,
    MDBBtn,
    MDBBadge,
} from "mdb-vue-ui-kit";

export default {
    components: {
        MDBCard,
        MDBCardBody,
        MDBCardTitle,
        MDBCardText,
        MDBCardImg,
        MDBBtn,
        MDBBadge,
    },
    props: ["product"],
    emits: ["update-products"],
    methods: {
        deleteProduct() {
            this.$emit("update-products", this.product.id);
        },
    },
    computed: {
        spliceDesc() {
            const length = this.product.desc.length;
            if (length <= 60) {
                return this.product.desc;
            } else {
                return `${this.product.desc.slice(0, 60)}...`;
            }
        },
        spliceTitle() {
            const length = this.product.title.length;
            if (length <= 20) {
                return this.product.title;
            } else {
                return `${this.product.title.slice(0, 20)}...`;
            }
        },
    },
};
</script>

<style scoped>
a {
    color: #000;
    text-decoration: none;
}
a:hover {
    color: #000;
}
</style>
