import { createApp } from "vue";
import App from "./App.vue";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import router from "./router";

import store from "./store";

createApp(App).use(router).use(store).mount("#app");
