const colors = {
  main: "#00abc5",
  note: "#E466FF",
  error: "#FF4C4C",
  success: "#66D166",
  warning: "#FFFF93",
  default: "#CCCCCC",
};

// Returns the color for the provided key or the default color
// in case the key is not found
const getColor = (key) => colors[key] || colors.default;

module.exports = {
  colors,
  getColor,
};
