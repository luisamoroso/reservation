import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

import {
  dateFormat,
  TIME_OPTIONS,
  activeColor,
  inactiveColor,
} from "@/shared/constants";

import {
  SET_LOCATION,
  SET_QUANTITY,
  SET_DATE,
  SET_TIME,
  SET_TIME_OPTIONS,
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
  location: "RESTAURANT",
  quantity: "2",
  startDate: initializeDate(),
  date: initializeDate(),
  time: initializeTime(initializeTimeOptions(initializeDate())),
  timeOptions: initializeTimeOptions(initializeDate()),
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
  [SET_LOCATION](state, newLocation) {
    state.location = newLocation;
  },
  [SET_QUANTITY](state, newQuantity) {
    state.quantity = newQuantity;
  },
  [SET_DATE](state, newDate) {
    state.date = newDate;
  },
  [SET_TIME](state, newTime) {
    state.time = newTime;
  },
  [SET_TIME_OPTIONS](state) {
    const day = moment(state.date).day();
    let timeOpt = {};
    switch (day) {
      case 6: // Saturday
        state.timeOptions = [...TIME_OPTIONS.saturday];
        timeOpt = TIME_OPTIONS.saturday[0];
        refreshTimeOptions(state, timeOpt);
        state.time = timeOpt.value;
        break;
      case 0: // Sunday
        state.timeOptions = [...TIME_OPTIONS.sunday];
        //  state.time = TIME_OPTIONS.sunday[0].value;
        timeOpt = TIME_OPTIONS.sunday[0];
        refreshTimeOptions(state, timeOpt);
        state.time = timeOpt.value;
        break;
      default:
        // Mon-Fri
        state.timeOptions = [...TIME_OPTIONS.default];
        // state.time = TIME_OPTIONS.default[0].value;
        timeOpt = TIME_OPTIONS.default[0];
        refreshTimeOptions(state, timeOpt);
        state.time = timeOpt.value;
        break;
    }
  },
  [UPDATE_TIME_OPTIONS](state, newTimeOption) {
    state.timeOptions.map((opt) => {
      if (opt.value === newTimeOption.value) {
        opt.color = activeColor;
        opt.outlined = false;
      } else {
        opt.color = inactiveColor;
        opt.outlined = true;
      }
    });
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
  setLocationAction({ commit }, payload) {
    commit(SET_LOCATION, payload);
  },
  setQuantityAction({ commit }, payload) {
    commit(SET_QUANTITY, payload);
  },
  setDateAction({ commit }, newDate) {
    commit(SET_DATE, newDate);
  },
  setTimeAction({ commit }, payload) {
    commit(SET_TIME, payload);
  },
  setTimeOptionsAction({ commit }) {
    commit(SET_TIME_OPTIONS);
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
};

function refreshTimeOptions(state, timeOpt) {
  state.timeOptions.map((opt) => {
    if (opt.value === timeOpt.value) {
      opt.color = activeColor;
      opt.outlined = false;
    } else {
      opt.color = inactiveColor;
      opt.outlined = true;
    }
  });
}

function initializeDate() {
  let currentDate = moment()
    .add(1, "d")
    .format(dateFormat);
  const day = moment(currentDate).day();
  if (day === 1) {
    currentDate = moment(currentDate)
      .add(1, "d")
      .format(dateFormat);
  }
  return currentDate;
}

function initializeTime(timeOptions) {
  return timeOptions[0].value;
}

function initializeTimeOptions(date) {
  let options = [];
  const day = moment(date).day();
  switch (day) {
    case 6:
      options = TIME_OPTIONS.saturday;
      break;
    case 0:
      options = TIME_OPTIONS.sunday;
      break;
    default:
      options = TIME_OPTIONS.default;
      break;
  }
  return options;
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
});
