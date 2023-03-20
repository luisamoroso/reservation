const brandColor = "light-green darken-2";
const activeColor = "light-green darken-1";
const inactiveColor = "grey darken-1";
const dateFormat = "YYYY-MM-DD";

const locationOptions = [
  {
    title: "Mediterrane Küche",
    address: "Obere Waiblingerstr. 153, 70374 Stuttgart",
    value: "0"
  },
  {
    title: "Meat & Greek",
    address: "Deckerstr. 51, 70372 Stuttgart",
    value: "1"
  },
];

const qtyOptions = [
  { text: "1", value: "1" },
  { text: "2", value: "2" },
  { text: "3", value: "3" },
  { text: "4", value: "4" },
  { text: "5", value: "5" },
  { text: "6", value: "6" },
  { text: "7", value: "7" },
  { text: "8", value: "8" },
  { text: "mehr", value: "more" },
];

const TIME_OPTIONS = {
  saturday: [
    { label: "16:00", value: "16:00", outlined: false, color: activeColor },
    { label: "16:30", value: "16:30", outlined: true, color: inactiveColor },
    { label: "17:00", value: "17:00", outlined: true, color: inactiveColor },
    { label: "17:30", value: "17:30", outlined: true, color: inactiveColor },
    { label: "18:00", value: "18:00", outlined: true, color: inactiveColor },
    { label: "18:30", value: "18:30", outlined: true, color: inactiveColor },
    { label: "19:00", value: "19:00", outlined: true, color: inactiveColor },
    { label: "19:30", value: "19:30", outlined: true, color: inactiveColor },
    { label: "20:00", value: "20:00", outlined: true, color: inactiveColor },
    // { label: "20:30", value: "20:30", outlined: true, color: inactiveColor },
    // { label: "21:00", value: "21:00", outlined: true, color: inactiveColor },
    // { label: "21:30", value: "21:30", outlined: true, color: inactiveColor },
    // { label: "22:00", value: "22:00", outlined: true, color: inactiveColor },
  ],
  sunday: [
    { label: "12:00", value: "12:00", outlined: false, color: activeColor },
    { label: "12:30", value: "12:30", outlined: true, color: inactiveColor },
    { label: "13:00", value: "13:00", outlined: true, color: inactiveColor },
    { label: "13:30", value: "13:30", outlined: true, color: inactiveColor },
    { label: "14:00", value: "14:00", outlined: true, color: inactiveColor },
    { label: "14:30", value: "14:30", outlined: true, color: inactiveColor },
    { label: "15:00", value: "15:00", outlined: true, color: inactiveColor },
    { label: "15:30", value: "15:30", outlined: true, color: inactiveColor },
    { label: "16:00", value: "16:00", outlined: true, color: inactiveColor },
    { label: "16:30", value: "16:30", outlined: true, color: inactiveColor },
    { label: "17:00", value: "17:00", outlined: true, color: inactiveColor },
    { label: "17:30", value: "17:30", outlined: true, color: inactiveColor },
    { label: "18:00", value: "18:00", outlined: true, color: inactiveColor },
    { label: "18:30", value: "18:30", outlined: true, color: inactiveColor },
    { label: "19:00", value: "19:00", outlined: true, color: inactiveColor },
    { label: "19:30", value: "19:30", outlined: true, color: inactiveColor },
    { label: "20:00", value: "20:00", outlined: true, color: inactiveColor },
    // { label: "20:30", value: "20:30", outlined: true, color: inactiveColor },
    // { label: "21:00", value: "21:00", outlined: true, color: inactiveColor },
    // { label: "21:30", value: "21:30", outlined: true, color: inactiveColor },
    // { label: "22:00", value: "22:00", outlined: true, color: inactiveColor },
  ],
  default: [
    { label: "16:00", value: "16:00", outlined: false, color: activeColor },
    { label: "16:30", value: "16:30", outlined: true, color: inactiveColor },
    { label: "17:00", value: "17:00", outlined: true, color: inactiveColor },
    { label: "17:30", value: "17:30", outlined: true, color: inactiveColor },
    { label: "18:00", value: "18:00", outlined: true, color: inactiveColor },
    { label: "18:30", value: "18:30", outlined: true, color: inactiveColor },
    { label: "19:00", value: "19:00", outlined: true, color: inactiveColor },
    { label: "19:30", value: "19:30", outlined: true, color: inactiveColor },
    { label: "20:00", value: "20:00", outlined: true, color: inactiveColor },
    // { label: "20:30", value: "20:30", outlined: true, color: inactiveColor },
    // { label: "21:00", value: "21:00", outlined: true, color: inactiveColor },
    // { label: "21:30", value: "21:30", outlined: true, color: inactiveColor },
    // { label: "22:00", value: "22:00", outlined: true, color: inactiveColor },
  ],
};

const timeItems = {
  saturday: {
    perHour: [
      { label: "16:00", value: "16:00" },
      { label: "17:00", value: "17:00" },
      { label: "18:00", value: "18:00" },
      { label: "19:00", value: "19:00" },
      { label: "20:00", value: "20:00" },
      { label: "21:00", value: "21:00" },
      { label: "22:00", value: "22:00" },
    ],
    perHalfHour: [
      { label: "16:30", value: "16:30" },
      { label: "17:30", value: "17:30" },
      { label: "18:30", value: "18:30" },
      { label: "19:30", value: "19:30" },
      { label: "20:30", value: "20:30" },
      { label: "21:30", value: "21:30" },
      { label: "22:30", value: "22:30" },
    ],
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
      { label: "22:00", value: "22:00" },
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
      { label: "22:30", value: "22:30" },
    ],
  },
  default: {
    perHour: [
      { label: "17:00", value: "17:00" },
      { label: "18:00", value: "18:00" },
      { label: "19:00", value: "19:00" },
      { label: "20:00", value: "20:00" },
      { label: "21:00", value: "21:00" },
      { label: "22:00", value: "22:00" },
    ],
    perHalfHour: [
      { label: "17:30", value: "17:30" },
      { label: "18:30", value: "18:30" },
      { label: "19:30", value: "19:30" },
      { label: "20:30", value: "20:30" },
      { label: "21:30", value: "21:30" },
      { label: "22:30", value: "22:30" },
    ],
  },
};

export {
  brandColor,
  activeColor,
  inactiveColor,
  dateFormat,
  TIME_OPTIONS,
  timeItems,
  qtyOptions,
  locationOptions,
};
