import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { VueReCaptcha } from "vue-recaptcha-v3";

Vue.use(VueReCaptcha, {
  siteKey: "6LdeAL0ZAAAAAPYs19LzoQfdhOPlaChbSXRZKghl",
  loaderOptions: {
    autoHideBadge: true,
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
