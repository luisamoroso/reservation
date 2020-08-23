<template>
  <v-container>
    <Title title="Online Reservierung" />
    <Overview />
    <CustomerForm />
    <RecaptchaMsg />
  </v-container>
</template>

<script>
import Title from "@/components/Title.vue";
import Overview from "@/components/Overview.vue";
import CustomerForm from "@/components/CustomerForm.vue";
import RecaptchaMsg from "@/components/RecaptchaMsg.vue";

export default {
  components: {
    Title,
    Overview,
    CustomerForm,
    RecaptchaMsg
  }
};
</script>
