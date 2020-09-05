const brandColor = "light-green darken-2";
const dateFormat = "YYYY-MM-DD";

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
    { label: "16:00", value: "16:00", outlined: false, color: brandColor },
    { label: "17:00", value: "17:00", outlined: true, color: "grey" },
    { label: "18:00", value: "18:00", outlined: true, color: "grey" },
    { label: "19:00", value: "19:00", outlined: true, color: "grey" },
    { label: "20:00", value: "20:00", outlined: true, color: "grey" },
    { label: "21:00", value: "21:00", outlined: true, color: "grey" },
    { label: "22:00", value: "22:00", outlined: true, color: "grey" },
  ],
  sunday: [
    { label: "13:00", value: "13:00", outlined: false, color: brandColor },
    { label: "14:00", value: "14:00", outlined: true, color: "grey" },
    { label: "15:00", value: "15:00", outlined: true, color: "grey" },
    { label: "16:00", value: "16:00", outlined: true, color: "grey" },
    { label: "17:00", value: "17:00", outlined: true, color: "grey" },
    { label: "18:00", value: "18:00", outlined: true, color: "grey" },
    { label: "19:00", value: "19:00", outlined: true, color: "grey" },
    { label: "20:00", value: "20:00", outlined: true, color: "grey" },
    { label: "21:00", value: "21:00", outlined: true, color: "grey" },
    { label: "22:00", value: "22:00", outlined: true, color: "grey" },
  ],
  default: [
    { label: "17:00", value: "17:00", outlined: false, color: brandColor },
    { label: "18:00", value: "18:00", outlined: true, color: "grey" },
    { label: "19:00", value: "19:00", outlined: true, color: "grey" },
    { label: "20:00", value: "20:00", outlined: true, color: "grey" },
    { label: "21:00", value: "21:00", outlined: true, color: "grey" },
    { label: "22:00", value: "22:00", outlined: true, color: "grey" },
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

export { brandColor, dateFormat, TIME_OPTIONS, timeItems, qtyOptions };
