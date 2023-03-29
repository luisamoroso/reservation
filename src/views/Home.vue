<template>
  <v-container>
    <ReservationForm />
  </v-container>
</template>

<script>
// @ is an alias to /src
import ReservationForm from "@/components/ReservationForm.vue";

export default {
  name: "Home",
  components: {
    ReservationForm
  }
};
</script>
