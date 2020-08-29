import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

import { dateFormat } from "@/shared/constants";

import {
  SET_QUANTITY,
  SET_DATE,
  SET_DATEPICKER,
  SET_TIME,
  SET_DATETIME,
  UPDATE_TIME_ITEM,
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
  date: moment().format(dateFormat),
  datetime: moment(),
  datepicker: "2020-09-11",
  time: "18:00",
  customerForm: false,
  confirmationPage: false,
  salutation: "Herr",
  firstname: "",
  lastname: "",
  telephone: "",
  email: "",
  comment: "",
  timeItems: [],
};
const mutations = {
  [SET_QUANTITY](state, payload) {
    state.quantity = payload;
  },
  [SET_DATE](state, payload) {
    state.date = payload;
  },
  [SET_DATETIME](state, payload) {
    state.datetime = payload;
  },
  [SET_DATEPICKER](state, payload) {
    state.datepicker = payload;
  },
  [SET_TIME](state, payload) {
    state.time = payload;
  },
  [UPDATE_TIME_ITEM](state, payload) {
    state.timeItems.push(payload);
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
  setDatetimeAction({ commit }, payload) {
    commit(SET_DATETIME, payload);
  },
  setDatepickerAction({ commit }, payload) {
    commit(SET_DATEPICKER, payload);
  },
  setTimeAction({ commit }, payload) {
    commit(SET_TIME, payload);
  },
  updateTimeItemAction({ commit }, timeItem) {
    commit(UPDATE_TIME_ITEM, timeItem);
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
  getDateFormatted: (state) => {
    return moment(state.date).format("DD.MM.YYYY");
  },
  getDay: (state) => {
    return moment(state.datetime).day();
  },
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
});
