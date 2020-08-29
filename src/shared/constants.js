const brandColor = "light-green darken-2";
const dateFormat = "YYYY-MM-DD";
//const datetimeFormat = "YYYY-MM-DD";

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

const availability = {
  saturday: {
    start: 1600,
  },
  sunday: {
    start: 1300,
  },
  default: {
    start: 1700,
  },
};

export { brandColor, dateFormat, timeItems, availability, qtyOptions };
