<template>
  <div>
    <v-row>
      <v-col>
        <div class="headline">Reservierung abschließen</div>

        <!-- Error message -->
        <v-alert type="error" v-if="this.errorMessage"
          >Ein Fehler ist aufgetretten. Bitte versuchen Sie es später
          erneut!</v-alert
        >

        <!-- Customer form-->
        <v-form ref="form" v-model="valid">
          <v-select
            @input="setSalutationAction"
            :items="salutationItems"
            :value="salutation"
            :rules="[(v) => !!v || 'Bitte wählen Sie eine Anrede aus']"
            label="Anrede"
            required
            :color="brandColor"
          ></v-select>

          <v-text-field
            @input="setFirstnameAction"
            :value="firstname"
            :counter="50"
            :rules="nameRules"
            label="Vorname *"
            required
            :color="brandColor"
          ></v-text-field>

          <v-text-field
            @input="setLastnameAction"
            :value="lastname"
            :counter="50"
            :rules="nameRules"
            label="Nachname *"
            required
            :color="brandColor"
          ></v-text-field>

          <v-text-field
            @input="setTelephoneAction"
            :value="telephone"
            label="Telefon *"
            type="tel"
            required
            :rules="telephoneRules"
            :color="brandColor"
          ></v-text-field>

          <v-text-field
            @input="setEmailAction"
            :value="email"
            :rules="emailRules"
            label="E-mail *"
            required
            :color="brandColor"
            hint="Wir schicken Ihnen eine Reservierungsbestätigung zu"
          ></v-text-field>

          <v-textarea
            @input="setCommentAction"
            :value="comment"
            name="comment"
            label="Besondere Wünsche (optional)"
            hint="z.B. draußen essen"
            rows="1"
            :color="brandColor"
            :counter="150"
            maxlength="150"
          ></v-textarea>

          <v-checkbox
            v-model="privacy"
            :rules="[(v) => !!v || '']"
            required
            :color="brandColor"
          >
            <template v-slot:label>
              <div>
                Ich stimme den
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      target="_blank"
                      href="https://www.porto-elia.net/impressum/"
                      @click.stop
                      v-on="on"
                      >allgemeinen Geschäftsbedingungen</a
                    >
                  </template>
                  Opens in new window </v-tooltip
                >&nbsp;und den
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      target="_blank"
                      href="https://www.porto-elia.net/j/privacy"
                      @click.stop
                      v-on="on"
                      >Datenschutzrichtlinien</a
                    >
                  </template>
                  Opens in new window </v-tooltip
                >&nbsp;zu.
              </div>
            </template>
          </v-checkbox>
          <v-row justify="space-around">
            <v-btn
              color="amber"
              x-large
              @click="submit"
              :loading="loading"
              :disabled="loading"
            >
              <span class="white--text">Jetz reservieren</span>
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-btn text @click="back">
        <v-icon left>mdi-arrow-left</v-icon>Zurück
      </v-btn>
    </v-row>
  </div>
</template>

<script>
// import axios from "axios";

import { brandColor } from "@/shared/constants";
import { mapState, mapActions } from "vuex";

export default {
  name: "CustomerForm",
  data() {
    return {
      brandColor: brandColor,
      valid: true,
      salutationItems: ["Herr", "Frau"],
      nameRules: [
        (v) => !!v || "Bitte geben Sie einen Namen ein",
        (v) => (v && v.length <= 50) || "Der Name ist zu lang",
      ],
      telephoneRules: [
        (v) => !!v || "Bitte geben Sie eine Telefonnummer ein",
        (v) =>
          (v && v.length > 5) ||
          "Bitte geben Sie eine gültige Telefonnummer ein",
        (v) =>
          (v && v.length < 20) ||
          "Bitte geben Sie eine gültige Telefonnummer ein",
      ],
      emailRules: [
        (v) => !!v || "Bitte geben Sie eine E-mail Adresse ein",
        (v) => /.+@.+\..+/.test(v) || "Bitte geben Sie eine E-mail Adresse ein",
      ],
      privacy: false,
      errorMessage: false,
      loading: false,
    };
  },
  computed: {
    ...mapState([
      "location",
      "quantity",
      "date",
      "time",
      "salutation",
      "firstname",
      "lastname",
      "telephone",
      "email",
      "comment",
      "confirmationPage",
    ]),
  },
  methods: {
    ...mapActions([
      "setSalutationAction",
      "setFirstnameAction",
      "setLastnameAction",
      "setTelephoneAction",
      "setEmailAction",
      "setCommentAction",
      "setConfirmationPageAction",
      "setCustomerFormAction",
    ]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // (optional) Wait until recaptcha has been loaded.
        await this.$recaptchaLoaded();
        // Execute reCAPTCHA with action "reservation".
        const token = await this.$recaptcha("reservation");

        if (token) {
          this.addReservation();
        } else {
          this.loading = false;
          this.errorMessage = true;
        }
      }
    },
    addReservation: function () {
      const data = {
        location: this.location,
        quantity: this.quantity,
        date: this.date,
        time: this.time,
        salutation: this.salutation,
        firstname: this.firstname,
        lastname: this.lastname,
        telephone: this.telephone,
        email: this.email,
        comment: this.comment,
        privacy: this.privacy,
      };
      console.log(data);

      // axios
      //   .post("index.php/home/reservation", data)
      //   .then((response) => {
      //     const data = response.data;
      //     if (data.success) {
      //       this.errorMessage = false;
      //       this.setConfirmationPageAction(true);
      //       this.$router.push({
      //         name: "Confirmation",
      //       });
      //     } else {
      //       this.errorMessage = true;
      //     }
      //     this.loading = false;
      //   })
      //   .catch((error) => {
      //     this.errorMessage = true;
      //     console.log(error);
      //     this.loading = false;
      //   });
    },
    back() {
      this.setCustomerFormAction(false);
      this.$router.back();
    },
  },
};
</script>