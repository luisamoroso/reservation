<template>
  <div>
    <v-row>
      <!-- quantity section -->
      <v-col cols="12" sm="6" md="12">
        <v-select
          label="Anzahl der Personen auswählen"
          @input="setQuantityAction"
          :items="quantityOptions"
          :value="quantity"
          :item-color="brandColor"
          :color="brandColor"
          prepend-icon="mdi-account-multiple"
        ></v-select>
        <v-alert v-if="!computedHideForm" text dense color="teal" icon="mdi-phone" border="left">
          Bei Reservierungen über 8 Personen kontaktieren Sie uns bitte telefonisch oder per WhatsApp unter der Nummer
          <a
            class="font-weight-bold"
            href="tel:+491785272501"
          >+491785272501</a>
        </v-alert>
      </v-col>
      <!-- date section -->
      <v-col cols="12" sm="6" md="12" v-if="computedHideForm">
        <v-menu
          v-model="menu"
          nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              @input="computedActiveDate"
              :value="getDateFormatted"
              label="Datum auswählen"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :color="brandColor"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="datepicker"
            @input="menu = false"
            :min="startDate"
            :max="endDate"
            :allowed-dates="allowedDates"
            :color="brandColor"
            @update:picker-date="pickerUpdate($event)"
            first-day-of-week="1"
            locale="de-de"
            elevation="5"
            no-title
          ></v-date-picker>
        </v-menu>
      </v-col>

      <!-- time section -->
      <v-col cols="12" sm="6" md="12" v-if="computedHideForm">
        <v-radio-group v-model="computedTime" label="Uhrzeit auswählen" prepend-icon="mdi-clock">
          <v-row>
            <v-col cols="6">
              <v-radio
                v-for="item in computedTimeItems.perHour"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :color="brandColor"
              ></v-radio>
            </v-col>
            <v-col cols="6">
              <v-radio
                v-for="item in computedTimeItems.perHalfHour"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :color="brandColor"
              ></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Weiter button -->
    <v-row v-if="computedHideForm">
      <v-col align="center">
        <v-btn :color="brandColor" @click="customerPage()" large dark>
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

import {
  brandColor,
  dateFormat,
  timeItems,
  qtyOptions
} from "@/shared/constants";

export default {
  name: "ReservationForm",
  data() {
    return {
      brandColor: brandColor,
      quantityOptions: qtyOptions,
      menu: false,
      datepicker: this.getStartDate(),
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      availableDates: []
    };
  },
  methods: {
    ...mapActions([
      "setQuantityAction",
      "setDateAction",
      "setTimeAction",
      "setCustomerFormAction"
    ]),
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
          .format(dateFormat);
        if (moment(date).day() !== 1) availableDates.push(date);
      }
      this.availableDates = availableDates;
      this.allowedDates();
    },
    getStartDate: function() {
      return moment().day() === 0
        ? moment()
            .add(2, "d")
            .format(dateFormat)
        : moment()
            .add(1, "d")
            .format(dateFormat);
    },
    getEndDate: function() {
      return moment()
        .add(3, "M")
        .format(dateFormat);
    },
    getTimeItems() {
      let items = {};
      let key = moment(this.date).day();
      switch (key) {
        case 6:
          items = timeItems.saturday;
          break;
        case 0:
          items = timeItems.sunday;
          break;
        default:
          items = timeItems.default;
          break;
      }
      return items;
    },
    customerPage: function() {
      this.setCustomerFormAction(true);
      this.$router.push({
        name: "Reservation",
        params: { customerForm: this.customerForm }
      });
    }
  },
  computed: {
    ...mapState(["quantity", "date", "customerForm"]),
    ...mapGetters(["getDateFormatted"]),
    computedActiveDate() {
      this.setDateAction(this.datepicker);
      return this.datepicker;
    },
    computedTimeItems: function() {
      return this.getTimeItems();
    },
    computedTime: function() {
      const t = this.getTimeItems().perHour[0].value;
      this.setTimeAction(t);
      return t;
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
</style>
