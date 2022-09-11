import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/mdb-vue-ui-kit/css/mdb.min.css";
import "../node_modules/vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);

app.use(router);
app.use(ToastPlugin);

app.mount("#app");
