<template>
  <v-alert outlined color="grey darken-2">
    <div class="title">Ihre Übersicht</div>
    <div>
      <b> <v-icon> mdi-map-marker-radius </v-icon></b>
      <span v-if="this.location === 'RESTAURANT'"
        >Restaurant Porto Elia ({{ locations[0].address }})</span
      >
      <span v-else
        >Taverne Porto Elia - {{ locations[1].title }} ({{
          locations[1].address
        }})</span
      >
    </div>
    <div>
      <b> <v-icon> mdi-account-multiple </v-icon></b>
      {{ this.quantity }}
      <span v-if="this.quantity > 1"> Personen</span>
      <span v-else> Person</span>
    </div>
    <div>
      <b><v-icon> mdi-calendar </v-icon></b>
      {{ this.getDateFormatted }}
    </div>
    <div>
      <b><v-icon> mdi-clock </v-icon></b>
      {{ this.time }}
    </div>
  </v-alert>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { locationOptions } from "@/shared/constants";

export default {
  name: "Overview",
  data() {
    return {
      locations: locationOptions,
    };
  },
  computed: {
    ...mapState(["location", "quantity", "time"]),
    ...mapGetters(["getDateFormatted"]),
  },
};
</script>