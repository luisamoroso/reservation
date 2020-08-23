<template>
  <v-container>
    <Title title="Online Reservierung" />
    <ReservationForm />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Title from "@/components/Title.vue";
import ReservationForm from "@/components/ReservationForm.vue";

export default {
  name: "Home",
  components: {
    Title,
    ReservationForm
  }
};
</script>
