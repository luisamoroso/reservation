<template>
  <div>
    <v-row>
      <v-col>
        <h3 class="grey--text text--darken-2" align="center">
          Vielen Dank für Ihre Reservierung!
        </h3>
        <br />
        <v-card max-width="344" class="mx-auto">
          <v-card-title>Ihre Reservierungsbestätigung</v-card-title>
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
              <span class="font-weight-bold">Ort:&nbsp;</span>
              <span v-if="this.location === 'RESTAURANT'"
                >Restaurant Porto Elia ({{ locations[0].address }})</span
              >
              <span v-else
                >Taverne Porto Elia - {{ locations[1].title }} ({{
                  locations[1].address
                }})</span
              >
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
          <p>
            Wir freuen uns, Sie bald bei uns begrüßen zu dürfen. Wir schicken
            Ihnen in Kürze eine Reservierungsbestätigung an die von Ihnen
            angegebene E-Mail Adresse zu.
          </p>
          <p>
            Sollten Sie innerhalb von 24 Stunden keine Bestätigung erhalten,
            kontaktieren Sie uns bitte telefonisch oder per WhatsApp unter der
            Nummer
            <a class="font-weight-bold" href="tel:+491785272501"
              >+491785272501</a
            >.
          </p>
        </div>
        <br />
        <p>Ihr Porto Elia Team</p>
        <address>
          Obere Waiblinger Straße 153 <br />

          70374 Stuttgart
        </address>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { locationOptions } from "@/shared/constants";

export default {
  name: "ConfirmationDetail",
  data() {
    return {
      locations: locationOptions,
    };
  },
  computed: {
    ...mapState([
      "location",
      "quantity",
      "time",
      "firstname",
      "lastname",
      "comment",
    ]),
    ...mapGetters(["getDateFormatted"]),
  },
  methods: {
    ...mapActions(["setCustomerFormAction", "setConfirmationPageAction"]),
  },
  created() {
    this.setCustomerFormAction(false);
    this.setConfirmationPageAction(false);
  },
};
</script>
