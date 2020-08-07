<template>
  <div class="home">
    <Reservation />
  </div>
</template>

<script>
// @ is an alias to /src
import Reservation from "@/components/Reservation.vue";

export default {
  name: "Home",
  components: {
    Reservation,
  },
};
</script>
