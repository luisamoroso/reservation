<template>
  <div>
    <v-row v-show="this.reservationMessage">
      <v-col>
        <h2>Reservierungsbestätigung</h2>
        <h3 class="grey--text text--darken-2">Vielen Dank für Ihre Reservierung!</h3>
        <br />
        <v-card max-width="344" class="mx-auto">
          <v-card-title>Ihre Reservierung</v-card-title>
          <v-card-text>
            <div class="text--primary">
              <span class="font-weight-bold">Name:&nbsp;</span>
              {{ this.firstname }}&nbsp; {{ this.lastname }}
            </div>
            <div class="text--primary">
              <span class="font-weight-bold">Datum:&nbsp;</span>
              {{ this.formatReservationDate() }}
            </div>
            <div class="text--primary">
              <span class="font-weight-bold">Uhrzeit:&nbsp;</span>
              {{ this.reservationTime }}
            </div>
            <div class="text--primary">
              <span class="font-weight-bold">Anzahl der Personen:&nbsp;</span>
              {{ this.reservationQty }}
            </div>
            <div class="text--primary">
              <span class="font-weight-bold">Anmerkung:&nbsp;</span>
              {{ this.comment }}
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

    <v-row class="text-center" v-show="!this.reservationMessage">
      <v-col>
        <h1 class="grey--text text--darken-2">Online Reservierung</h1>
      </v-col>
    </v-row>
    <v-alert
      type="error"
      v-if="this.errorMessage"
    >Ein Fehler ist aufgetretten. Bitte versuchen Sie es später erneut!</v-alert>
    <v-row v-show="!this.reservationMessage">
      <v-col>
        <v-alert outlined color="grey darken-2" v-if="this.reservationStep == 4">
          <div class="title">Ihre Reservierung</div>
          <div>
            <b>Datum:</b>
            {{this.formatReservationDate()}}
          </div>
          <div>
            <b>Uhrzeit:</b>
            {{ this.reservationTime }}
          </div>
          <div>
            <b>Anzahl der Personen:</b>
            {{ this.reservationQty }}
          </div>
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-show="!this.reservationMessage">
      <v-col>
        <v-stepper v-model="reservationStep">
          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="headline">Anzahl der Personen auswählen</div>
              <br />
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="reservationQty"
                    :items="reservationQtyOptions"
                    :item-color="brandColor"
                    :color="brandColor"
                  ></v-select>
                </v-col>
              </v-row>

              <v-alert
                v-if="reservationQty === 'more'"
                text
                dense
                color="teal"
                icon="mdi-phone"
                border="left"
              >
                Bei Reservierungen über 8 Personen kontaktieren Sie uns bitte telefonisch oder per WhatsApp unter der Nummer
                <a
                  class="font-weight-bold"
                  href="tel:+491785272501"
                >+491785272501</a>
              </v-alert>

              <v-row>
                <v-col cols="12" align="end">
                  <v-btn
                    :color="brandColor"
                    @click="goToStep2()"
                    :disabled="reservationQty === 'more'"
                    dark
                  >
                    Weiter
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="headline">Datum auswählen</div>
              <br />
              <v-row justify="space-around">
                <v-date-picker
                  v-model="reservationDate"
                  :min="startDate"
                  :max="maxDate"
                  :allowed-dates="allowedDates"
                  :color="brandColor"
                  @update:picker-date="pickerUpdate($event)"
                  first-day-of-week="1"
                  locale="de-de"
                  elevation="5"
                ></v-date-picker>
              </v-row>
              <br />

              <v-row>
                <v-col cols="6">
                  <v-btn text @click="reservationStep = 1">
                    <v-icon left>mdi-arrow-left</v-icon>Zurück
                  </v-btn>
                </v-col>
                <v-col cols="6" align="end">
                  <v-btn :color="brandColor" @click="goToStep3()" :disabled="isMonday()" dark>
                    Weiter
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="headline">Uhrzeit auswählen</div>
              <v-container>
                <v-radio-group v-model="reservationTime">
                  <v-row>
                    <v-col cols="6">
                      <v-radio
                        v-for="item in reservationTimeItems.perHour"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :color="brandColor"
                      ></v-radio>
                    </v-col>
                    <v-col cols="6">
                      <v-radio
                        v-for="item in reservationTimeItems.perHalfHour"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :color="brandColor"
                      ></v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-container>

              <v-row>
                <v-col cols="6">
                  <v-btn text @click="reservationStep = 2">
                    <v-icon left>mdi-arrow-left</v-icon>Zurück
                  </v-btn>
                </v-col>
                <v-col cols="6" align="end">
                  <v-btn :color="brandColor" @click="goToStep4()" dark>
                    Weiter
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="4">
              <div class="headline">Reservierung abschließen</div>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-select
                  v-model="salutation"
                  :items="salutationItems"
                  :rules="[(v) => !!v || 'Bitte wählen Sie eine Anrede aus']"
                  label="Anrede"
                  required
                  :color="brandColor"
                ></v-select>

                <v-text-field
                  v-model="firstname"
                  :counter="50"
                  :rules="nameRules"
                  label="Vorname"
                  required
                  :color="brandColor"
                ></v-text-field>

                <v-text-field
                  v-model="lastname"
                  :counter="50"
                  :rules="nameRules"
                  label="Nachname"
                  required
                  :color="brandColor"
                ></v-text-field>

                <v-text-field
                  v-model="telephone"
                  label="Telefon"
                  type="tel"
                  required
                  :rules="telephoneRules"
                  :color="brandColor"
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  :color="brandColor"
                  hint="Wir schicken Ihnen eine Reservierungsbestätigung zu"
                ></v-text-field>

                <v-textarea
                  v-model="comment"
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
                          >allgemeinen Geschäftsbedingungen</a>
                        </template>
                        Opens in new window
                      </v-tooltip>&nbsp;und den
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            target="_blank"
                            href="https://www.porto-elia.net/j/privacy"
                            @click.stop
                            v-on="on"
                          >Datenschutzrichtlinien</a>
                        </template>
                        Opens in new window
                      </v-tooltip>&nbsp;zu.
                    </div>
                  </template>
                </v-checkbox>

                <v-row justify="space-around">
                  <v-btn
                    color="amber"
                    x-large
                    @click="recaptcha"
                    :loading="loading"
                    :disabled="loading"
                  >
                    <span class="white--text">Jetz reservieren</span>
                  </v-btn>
                </v-row>
              </v-form>
              <br />
              <v-row>
                <v-btn text @click="reservationStep = 3">
                  <v-icon left>mdi-arrow-left</v-icon>Zurück
                </v-btn>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <div class="text-caption" v-if="this.reservationStep == 4">
      This site is protected by reCAPTCHA and the Google
      <a
        href="https://policies.google.com/privacy"
      >Privacy Policy</a> and
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      brandColor: "light-green darken-2",
      reservationStep: 1,
      reservationQty: "2",
      reservationQtyOptions: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "4", value: "4" },
        { text: "5", value: "5" },
        { text: "6", value: "6" },
        { text: "7", value: "7" },
        { text: "8", value: "8" },
        { text: "mehr", value: "more" }
      ],
      reservationDate: this.getStartDate(),
      startDate: this.getStartDate(),
      maxDate: this.getMaxDate(),
      availableDates: [],
      reservationTime: "17:00",
      timeItems: {
        saturday: {
          perHour: [
            { label: "16:00", value: "16:00" },
            { label: "17:00", value: "17:00" },
            { label: "18:00", value: "18:00" },
            { label: "19:00", value: "19:00" },
            { label: "20:00", value: "20:00" },
            { label: "21:00", value: "21:00" },
            { label: "22:00", value: "22:00" }
          ],
          perHalfHour: [
            { label: "16:30", value: "16:30" },
            { label: "17:30", value: "17:30" },
            { label: "18:30", value: "18:30" },
            { label: "19:30", value: "19:30" },
            { label: "20:30", value: "20:30" },
            { label: "21:30", value: "21:30" },
            { label: "22:30", value: "22:30" }
          ]
        },
        sunday: {
          perHour: [
            { label: "13:00", value: "13:00" },
            { label: "14:00", value: "14:00" },
            { label: "15:00", value: "15:00" },
            { label: "16:00", value: "16:00" },
            { label: "17:00", value: "17:00" },
            { label: "18:00", value: "18:00" },
            { label: "19:00", value: "19:00" },
            { label: "20:00", value: "20:00" },
            { label: "21:00", value: "21:00" },
            { label: "22:00", value: "22:00" }
          ],
          perHalfHour: [
            { label: "13:30", value: "13:30" },
            { label: "14:30", value: "14:30" },
            { label: "15:30", value: "15:30" },
            { label: "16:30", value: "16:30" },
            { label: "17:30", value: "17:30" },
            { label: "18:30", value: "18:30" },
            { label: "19:30", value: "19:30" },
            { label: "20:30", value: "20:30" },
            { label: "21:30", value: "21:30" },
            { label: "22:30", value: "22:30" }
          ]
        },
        default: {
          perHour: [
            { label: "17:00", value: "17:00" },
            { label: "18:00", value: "18:00" },
            { label: "19:00", value: "19:00" },
            { label: "20:00", value: "20:00" },
            { label: "21:00", value: "21:00" },
            { label: "22:00", value: "22:00" }
          ],
          perHalfHour: [
            { label: "17:30", value: "17:30" },
            { label: "18:30", value: "18:30" },
            { label: "19:30", value: "19:30" },
            { label: "20:30", value: "20:30" },
            { label: "21:30", value: "21:30" },
            { label: "22:30", value: "22:30" }
          ]
        }
      },
      valid: true,
      salutation: "Herr",
      salutationItems: ["Herr", "Frau"],
      firstname: "",
      lastname: "",
      nameRules: [
        v => !!v || "Bitte geben Sie einen Namen ein",
        v => (v && v.length <= 50) || "Der Name ist zu lang"
      ],
      telephone: "",
      telephoneRules: [
        v => !!v || "Bitte geben Sie eine Telefonnummer ein",
        v =>
          (v && v.length > 5) ||
          "Bitte geben Sie eine gültige Telefonnummer ein",
        v =>
          (v && v.length < 20) ||
          "Bitte geben Sie eine gültige Telefonnummer ein"
      ],
      email: "",
      emailRules: [
        v => !!v || "Bitte geben Sie eine E-mail Adresse ein",
        v => /.+@.+\..+/.test(v) || "Bitte geben Sie eine E-mail Adresse ein"
      ],
      comment: "",
      privacy: false,
      lazy: false,
      reservationMessage: false,
      errorMessage: false,
      loading: false
    };
  },
  computed: {
    reservationTimeItems: function() {
      return this.getReservationTimeItems();
    }
  },
  methods: {
    allowedDates(a) {
      return this.availableDates.includes(a);
    },
    pickerUpdate: function(val) {
      let totalDay = moment(val, "YYYY-MM").daysInMonth();
      let availableDates = [];

      let monthNow = moment().format("M");
      let monthSelected = moment(val).format("M");
      let day;

      if (monthNow == monthSelected) day = moment().format("D");
      else day = 1;

      for (let i = day; i <= totalDay; i++) {
        let date = moment()
          .month(val.split("-")[1] - 1)
          .date(i)
          .format("YYYY-MM-DD");
        if (moment(date).day() !== 1) availableDates.push(date);
      }
      this.availableDates = availableDates;
      this.allowedDates();
    },
    isMonday: function() {
      return moment(this.reservationDate).day() === 1;
    },
    getStartDate: function() {
      return moment().day() === 0
        ? moment()
            .add(2, "d")
            .format("YYYY-MM-DD")
        : moment()
            .add(1, "d")
            .format("YYYY-MM-DD");
    },
    getMaxDate: function() {
      return moment()
        .add(3, "M")
        .format("YYYY-MM-DD");
    },
    goToStep2() {
      this.reservationStep = 2;
    },
    goToStep3() {
      this.reservationTime = this.getReservationTimeItems().perHour[0].value;
      this.reservationStep = 3;
    },
    goToStep4() {
      this.reservationStep = 4;
    },
    getReservationTimeItems() {
      let items = {};
      let key = moment(this.reservationDate).day();
      switch (key) {
        case 6:
          items = this.timeItems.saturday;
          break;
        case 0:
          items = this.timeItems.sunday;
          break;
        default:
          items = this.timeItems.default;
          break;
      }
      return items;
    },
    async recaptcha() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // (optional) Wait until recaptcha has been loaded.
        await this.$recaptchaLoaded();
        // Execute reCAPTCHA with action "reservation".
        const token = await this.$recaptcha("reservation");

        if (token) {
          this.addReservation();
        }
        this.loading = false;
      }
    },
    addReservation: function() {
      const data = {
        quantity: this.reservationQty,
        date: this.reservationDate,
        time: this.reservationTime,
        salutation: this.salutation,
        firstname: this.firstname,
        lastname: this.lastname,
        telephone: this.telephone,
        email: this.email,
        comment: this.comment,
        privacy: this.privacy
      };
      axios
        .post("index.php/home/reservation", data)
        .then(response => {
          const data = response.data;
          if (data.success) {
            this.reservationMessage = true;
            this.errorMessage = false;
          } else {
            this.reservationMessage = false;
            this.errorMessage = true;
          }
        })
        .catch(error => {
          this.reservationMessage = false;
          this.errorMessage = true;
          console.log(error);
        });
    },
    formatReservationDate: function() {
      return moment(this.reservationDate).format("DD.MM.YYYY");
    }
  }
};
</script>
