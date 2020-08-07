<template>
  <div>
    <v-alert prominent type="error">
      <v-row align="center">
        <v-col class="grow">
          <h2>Seite in Bearbeitung!</h2>
          <span>
            Reservierungen sind unter
            <a
              href="https://www.porto-elia.net/online-reservierungen/"
              class="grey--text text--lighten-5 font-weight-bold"
            >www.porto-elia.net</a>
            möglich.
          </span>
        </v-col>
      </v-row>
    </v-alert>
    <v-row v-show="this.reservationMessage">
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="grey--text text--darken-2 display-2">Danke für Ihre Reservierung</h1>
          <h2>
            Am {{ this.formatReservationDate() }} um {{ this.reservationTime }} für
            {{ this.reservationQty }} Gäste
          </h2>
        </v-col>
      </v-row>
    </v-row>

    <v-row class="text-center" v-show="!this.reservationMessage">
      <v-col class="mb-4">
        <h1 class="grey--text text--darken-2 display-2">Jetzt reservieren</h1>
      </v-col>
    </v-row>
    <v-alert
      type="error"
      v-if="this.errorMessage"
    >Ein Fehler ist aufgetretten. Bitte versuchen Sie es später erneut!</v-alert>
    <v-row v-show="!this.reservationMessage">
      <v-col>
        <v-stepper v-model="reservationStep">
          <v-stepper-header>
            <v-stepper-step
              :complete="reservationStep > 1"
              step="1"
              :color="brandColor"
              :editable="editableStep"
            >Anzahl der Personen</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="reservationStep > 2"
              step="2"
              :color="brandColor"
              :editable="editableStep"
            >Datum</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="reservationStep > 3"
              step="3"
              :color="brandColor"
              :editable="editableStep"
            >Uhrzeit</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="reservationStep > 4"
              step="4"
              :color="brandColor"
              :editable="editableStep"
            >Reservierung</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="headline">Anzahl der Personen auswählen</div>
              <br />

              <v-select
                v-model="reservationQty"
                :items="reservationQtyOptions"
                :item-color="brandColor"
                :color="brandColor"
              ></v-select>

              <v-alert
                v-if="reservationQty === 'more'"
                text
                dense
                color="teal"
                icon="mdi-phone"
                border="left"
              >
                Vestibulum ullamcorper mauris at ligula. Nulla porta dolor.
                Vestibulum facilisis.
              </v-alert>

              <v-row>
                <v-col cols="12" align="end">
                  <v-btn
                    :color="brandColor"
                    @click="reservationStep = 2"
                    :disabled="reservationQty === 'more'"
                  >
                    <span class="white--text">Weiter</span>
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
                  :min="currentDate"
                  :max="maxDate"
                  :allowed-dates="allowedDates"
                  :color="brandColor"
                  @update:picker-date="pickerUpdate($event)"
                  locale="de-de"
                  elevation="5"
                ></v-date-picker>
              </v-row>
              <br />

              <v-row>
                <v-col cols="6">
                  <v-btn text @click="reservationStep = 1">Zurück</v-btn>
                </v-col>
                <v-col cols="6" align="end">
                  <v-btn :color="brandColor" @click="goToStep3()">
                    <span class="white--text">Weiter</span>
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
                  <v-btn text @click="reservationStep = 2">Zurück</v-btn>
                </v-col>
                <v-col cols="6" align="end">
                  <v-btn :color="brandColor" @click="reservationStep = 4">
                    <span class="white--text">Weiter</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="4">
              <div class="headline">Reservierung abschließen</div>
              <h3 align="center">
                Am {{this.formatReservationDate()}} um {{ this.reservationTime }} für
                {{ this.reservationQty }} Personen
              </h3>

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
                <!--
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  :color="brandColor"
                ></v-text-field>
                -->
                <v-textarea
                  v-model="comment"
                  name="comment"
                  label="Anmerkung (optional)"
                  rows="1"
                  :color="brandColor"
                  :counter="150"
                  maxlength="150"
                ></v-textarea>

                <v-checkbox
                  v-model="privacy"
                  :rules="[(v) => !!v || '']"
                  label="Ich stimme Porto Elia Impressum und Datenschutzrichtlinen zu"
                  required
                  :color="brandColor"
                ></v-checkbox>

                <v-row justify="space-around">
                  <v-btn color="amber" x-large @click="validate">
                    <span class="white--text">Jetz reservieren</span>
                  </v-btn>
                </v-row>
              </v-form>
              <br />
              <v-row>
                <v-btn text @click="reservationStep = 3">Zurück</v-btn>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
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
      editableStep: true,
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
      reservationDate: this.setCurrentDate(),
      currentDate: this.setCurrentDate(),
      maxDate: this.setMaxDate(),
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
      telephoneRules: [v => !!v || "Bitte geben Sie eine Telefonnummer ein"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      comment: "",
      privacy: false,
      lazy: false,
      reservationMessage: false,
      errorMessage: false,
      info: null
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
    setCurrentDate: function() {
      return moment().format("YYYY-MM-DD");
    },
    setMaxDate: function() {
      return moment()
        .add(3, "M")
        .format("YYYY-MM-DD");
    },
    goToStep3() {
      this.reservationTime = this.getReservationTimeItems().perHour[0].value;
      this.reservationStep = 3;
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
    validate() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.addReservation();
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
        comment: this.comment,
        privacy: this.privacy
      };
      axios
        .post("/ReservationForm.php", data)
        .then(response => {
          console.log(response);
          this.reservationMessage = true;
          this.errorMessage = false;
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
