<template>
  <v-container>
    <Title title="Reservierungsbestätigung" />
    <ConfirmationDetail />
  </v-container>
</template>
<script>
import Title from "@/components/Title.vue";
import ConfirmationDetail from "@/components/ConfirmationDetail.vue";

export default {
  name: "Confirmation",
  components: {
    Title,
    ConfirmationDetail
  }
};
</script>