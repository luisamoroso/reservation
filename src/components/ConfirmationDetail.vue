<template>
  <v-row>
    <v-col>
      <h3 class="grey--text text--darken-2" align="center">Vielen Dank für Ihre Reservierung!</h3>
      <br />
      <v-card max-width="344" class="mx-auto">
        <v-card-title>Ihre Reservierung</v-card-title>
        <v-card-text>
          <div class="text--primary">
            <span class="font-weight-bold">Name:&nbsp;</span>
            {{ this.firstname }}&nbsp; {{ this.lastname }}
          </div>
          <div class="text--primary">
            <span class="font-weight-bold">Anzahl der Personen:&nbsp;</span>
            {{ this.quantity }}
          </div>
          <div class="text--primary">
            <span class="font-weight-bold">Datum:&nbsp;</span>
            {{ this.getDateFormatted }}
          </div>
          <div class="text--primary">
            <span class="font-weight-bold">Uhrzeit:&nbsp;</span>
            {{ this.time }}
          </div>
          <div class="text--primary">
            <span class="font-weight-bold">Besondere Wünsche:&nbsp;</span>
            <span v-if="this.comment">{{ this.comment }}</span>
            <span v-else>keine</span>
          </div>
        </v-card-text>
      </v-card>
      <br />
      <div>
        <p>Wir freuen uns, Sie bald bei uns begrüßen zu dürfen. Wir schicken Ihnen in Kürze eine Reservierungsbestätigung an die von Ihnen angegebene E-Mail Adresse zu.</p>
        <p>
          Sollten Sie innerhalb von 24 Stunden keine Bestätigung erhalten, kontaktieren Sie uns bitte telefonisch oder per WhatsApp unter der Nummer
          <a
            class="font-weight-bold"
            href="tel:+491785272501"
          >+491785272501</a>.
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ConfirmationDetail",
  computed: {
    ...mapState(["quantity", "time", "firstname", "lastname", "comment"]),
    ...mapGetters(["getDateFormatted"])
  },
  methods: {
    ...mapActions(["setCustomerFormAction", "setConfirmationPageAction"])
  },
  created() {
    this.setCustomerFormAction(false);
    this.setConfirmationPageAction(false);
  }
};
</script>
