<template>
  <v-alert outlined color="grey darken-2">
    <div class="title">Ihre Übersicht</div>
    <div>
      <b>
        <v-icon>
          mdi-account-multiple
        </v-icon></b
      >
      {{ this.quantity }}
      <span v-if="this.quantity > 1"> Personen</span>
      <span v-else> Person</span>
    </div>
    <div>
      <b
        ><v-icon>
          mdi-calendar
        </v-icon></b
      >
      {{ this.getDateFormatted }}
    </div>
    <div>
      <b
        ><v-icon>
          mdi-clock
        </v-icon></b
      >
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