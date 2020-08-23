<template>
  <v-alert outlined color="grey darken-2">
    <div class="title">Ihre Reservierung</div>
    <div>
      <b>Anzahl der Personen:</b>
      {{ this.quantity }}
    </div>
    <div>
      <b>Datum:</b>
      {{this.getDateFormatted}}
    </div>
    <div>
      <b>Uhrzeit:</b>
      {{ this.time }}
    </div>
  </v-alert>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Overview",
  computed: {
    ...mapState(["quantity", "time"]),
    ...mapGetters(["getDateFormatted"])
  }
};
</script>