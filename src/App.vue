<template>
    <Navbar></Navbar>
    <section>
        <div class="container mt-5">
            <RouterView></RouterView>
        </div>
    </section>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
    data() {
        return {};
    },
    components: { Navbar },
};
</script>

<style>
#app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
