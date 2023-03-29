<template>
  <v-container>
    <Overview />
    <CustomerForm />
    <RecaptchaMsg />
  </v-container>
</template>

<script>
import Overview from "@/components/Overview.vue";
import CustomerForm from "@/components/CustomerForm.vue";
import RecaptchaMsg from "@/components/RecaptchaMsg.vue";

export default {
  components: {
    Overview,
    CustomerForm,
    RecaptchaMsg
  }
};
</script>
