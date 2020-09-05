import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

import { dateFormat, TIME_OPTIONS } from "@/shared/constants";

import {
  SET_QUANTITY,
  SET_DATE,
  SET_TIME,
  UPDATE_TIME_OPTIONS,
  SET_CUSTOMER_FORM,
  SET_CONFIRMATION_PAGE,
  SET_SALUTATION,
  SET_FIRSTNAME,
  SET_LASTNAME,
  SET_TELEPHONE,
  SET_EMAIL,
  SET_COMMENT,
} from "./mutation-types";

Vue.use(Vuex);

const state = {
  quantity: "2",
  startDate: initializeDate(),
  date: initializeDate(),
  time: initializeTime(),
  timeOptions: TIME_OPTIONS,
  customerForm: false,
  confirmationPage: false,
  salutation: "Herr",
  firstname: "",
  lastname: "",
  telephone: "",
  email: "",
  comment: "",
};
const mutations = {
  [SET_QUANTITY](state, payload) {
    state.quantity = payload;
  },
  [SET_DATE](state, payload) {
    state.date = payload;
  },
  [SET_TIME](state, payload) {
    state.time = payload;
  },
  [UPDATE_TIME_OPTIONS](state, payload) {
    console.log(payload);

    //state.timeOptions = payload;
  },
  [SET_CUSTOMER_FORM](state, payload) {
    state.customerForm = payload;
  },
  [SET_CONFIRMATION_PAGE](state, payload) {
    state.confirmationPage = payload;
  },
  [SET_SALUTATION](state, payload) {
    state.salutation = payload;
  },
  [SET_FIRSTNAME](state, payload) {
    state.firstname = payload;
  },
  [SET_LASTNAME](state, payload) {
    state.lastname = payload;
  },
  [SET_TELEPHONE](state, payload) {
    state.telephone = payload;
  },
  [SET_EMAIL](state, payload) {
    state.email = payload;
  },
  [SET_COMMENT](state, payload) {
    state.comment = payload;
  },
};
const actions = {
  setQuantityAction({ commit }, payload) {
    commit(SET_QUANTITY, payload);
  },
  setDateAction({ commit }, payload) {
    commit(SET_DATE, payload);
  },
  setTimeAction({ commit }, payload) {
    commit(SET_TIME, payload);
  },
  updateTimeOptionsAction({ commit }, timeOption) {
    commit(UPDATE_TIME_OPTIONS, timeOption);
  },
  setCustomerFormAction({ commit }, payload) {
    commit(SET_CUSTOMER_FORM, payload);
  },
  setConfirmationPageAction({ commit }, payload) {
    commit(SET_CONFIRMATION_PAGE, payload);
  },
  setSalutationAction({ commit }, payload) {
    commit(SET_SALUTATION, payload);
  },
  setFirstnameAction({ commit }, payload) {
    commit(SET_FIRSTNAME, payload);
  },
  setLastnameAction({ commit }, payload) {
    commit(SET_LASTNAME, payload);
  },
  setTelephoneAction({ commit }, payload) {
    commit(SET_TELEPHONE, payload);
  },
  setEmailAction({ commit }, payload) {
    commit(SET_EMAIL, payload);
  },
  setCommentAction({ commit }, payload) {
    commit(SET_COMMENT, payload);
  },
};
const getters = {
  getEndDate: (state) => {
    return moment(state.startDate)
      .add(3, "M")
      .format(dateFormat);
  },
  getDateFormatted: (state) => {
    return moment(state.date).format("DD.MM.YYYY");
  },
  getTimeOptions: (state) => {
    let options = [];
    const day = moment(state.date).day();
    switch (day) {
      case 6:
        options = TIME_OPTIONS.saturday;
        // state.time = TIME_OPTIONS.saturday[0].value;
        break;
      case 0:
        options = TIME_OPTIONS.sunday;
        // state.time = TIME_OPTIONS.sunday[0].value;
        break;
      default:
        options = TIME_OPTIONS.default;
        // state.time = TIME_OPTIONS.default[0].value;
        break;
    }
    return options;
  },
};

function initializeDate() {
  const day = moment().day();
  return day === 1
    ? moment()
        .add(2, "d")
        .format(dateFormat)
    : moment()
        .add(1, "d")
        .format(dateFormat);
}

function initializeTime() {
  const day = moment(initializeDate()).day();
  let time = "";
  switch (day) {
    case 6:
      time = TIME_OPTIONS.saturday[0].value;
      break;
    case 0:
      time = TIME_OPTIONS.sunday[0].value;
      break;
    default:
      time = TIME_OPTIONS.default[0].value;
      break;
  }
  console.log("initializeTime -> time", time);

  return time;
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
});
