<template>
  <div>
    <!-- <DevSystem /> -->
    <v-row>
      <!-- quantity section -->
      <v-col cols="12" sm="6" md="12">
        <v-select
          label="Anzahl der Personen auswählen"
          @input="setQuantity"
          :items="quantityOptions"
          :value="quantity"
          :item-color="brandColor"
          :color="brandColor"
          prepend-icon="mdi-account-multiple"
        ></v-select>
        <v-alert
          v-if="!computedHideForm"
          text
          dense
          color="teal"
          icon="mdi-phone"
          border="left"
        >
          Bei Reservierungen über 8 Personen kontaktieren Sie uns bitte
          telefonisch oder per WhatsApp unter der Nummer
          <a class="font-weight-bold" href="tel:+491785272501">+491785272501</a>
        </v-alert>
      </v-col>

      <!-- date section -->
      <v-col cols="12" sm="6" md="12" v-if="computedHideForm">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="getDateFormatted"
              label="Datum auswählen"
              :color="brandColor"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @click="menu = false"
            @input="$refs.menu.save(date)"
            :min="startDate"
            :max="getEndDate"
            :allowed-dates="allowedDates"
            :color="brandColor"
            first-day-of-week="1"
            locale="de-de"
            no-title
          ></v-date-picker>
        </v-menu>
      </v-col>

      <!-- time section -->
      <v-col cols="12" sm="6" md="12" v-if="computedHideForm">
        <div>
          <v-icon>mdi-clock</v-icon>
          <span class="clock">Uhrzeit auswählen: {{ time }}</span>
        </div>
        <div class="text-center">
          <span v-for="timeOption in timeOptions" :key="timeOption.value">
            <v-btn
              :color="timeOption.color"
              :outlined="timeOption.outlined"
              @click="updateTime(timeOption)"
              class="time-btn"
              dark
              rounded
              >{{ timeOption.label }}</v-btn
            >
          </span>
        </div>
      </v-col>
    </v-row>

    <!-- Weiter button -->
    <v-row v-if="computedHideForm">
      <v-col align="center">
        <v-btn :color="brandColor" @click="customerPage()" x-large dark>
          Weiter
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
//import DevSystem from "@/components/DevSystem.vue";

import { brandColor, qtyOptions } from "@/shared/constants";

export default {
  name: "ReservationForm",
  components: {
    //DevSystem
  },
  data() {
    return {
      timeColor: "grey",
      timeOutlined: true,
      brandColor: brandColor,
      quantityOptions: qtyOptions,
      menu: false,
      availableDates: []
    };
  },
  methods: {
    ...mapActions([
      "setQuantityAction",
      "setDateAction",
      "setTimeAction",
      "setTimeOptionsAction",
      "updateTimeOptionsAction",
      "setCustomerFormAction"
    ]),
    setQuantity(val) {
      this.setQuantityAction(val);
      if (this.quantity === "more") {
        this.setCustomerFormAction(false);
      }
    },
    allowedDates: function(val) {
      return moment(val).day() !== 1 ? moment(val).format("D") : 0; //Allow all days except mondays
    },
    updateTime(timeOption) {
      this.setTimeAction(timeOption.value);
      this.updateTimeOptionsAction(timeOption);
    },
    customerPage: function() {
      this.setCustomerFormAction(true);
      this.$router.push({
        name: "Reservation"
      });
    }
  },
  computed: {
    ...mapState([
      "quantity",
      "startDate",
      "time",
      "timeOptions",
      "customerForm"
    ]),
    ...mapGetters(["getDateFormatted", "getEndDate"]),

    date: {
      get: function() {
        return this.$store.state.date;
      },
      set: function(newDate) {
        // this.$store.commit("setDate", newDate);
        if (this.$store.state.date !== newDate) {
          this.setDateAction(newDate);
          this.setTimeOptionsAction();
        }
      }
    },
    computedHideForm: function() {
      return this.quantity !== "more";
    }
  }
};
</script>

<style scoped>
.v-input--selection-controls {
  margin-top: 0px;
  padding-bottom: 0px;
}
.clock {
  margin-left: 8px;
}
.time-btn {
  margin: 4px;
}
</style>
