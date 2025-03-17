// Colors for the bot's embeds
// Usage: .setColor(getColor("main"))
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

// Multiple colors for console.log messages
// Usage: colorize().red + "Hello, World!" + colorize().reset
const colorize = (...args) => ({
  reset: `\x1b[0m${args.join(" ")}`,
  black: `\x1b[30m${args.join(" ")}`,
  red: `\x1b[31m${args.join(" ")}`,
  green: `\x1b[32m${args.join(" ")}`,
  yellow: `\x1b[33m${args.join(" ")}`,
  blue: `\x1b[34m${args.join(" ")}`,
  magenta: `\x1b[35m${args.join(" ")}`,
  cyan: `\x1b[36m${args.join(" ")}`,
  white: `\x1b[37m${args.join(" ")}`,
  bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(" ")}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(" ")}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(" ")}\x1b[0m`,

  brightBlack: `\x1b[90m${args.join(" ")}`,
  brightRed: `\x1b[91m${args.join(" ")}`,
  brightGreen: `\x1b[92m${args.join(" ")}`,
  brightYellow: `\x1b[93m${args.join(" ")}`,
  brightBlue: `\x1b[94m${args.join(" ")}`,
  brightMagenta: `\x1b[95m${args.join(" ")}`,
  brightCyan: `\x1b[96m${args.join(" ")}`,
  brightWhite: `\x1b[97m${args.join(" ")}`,

  bgBrightBlack: `\x1b[100m${args.join(" ")}\x1b[0m`,
  bgBrightRed: `\x1b[101m${args.join(" ")}\x1b[0m`,
  bgBrightGreen: `\x1b[102m${args.join(" ")}\x1b[0m`,
  bgBrightYellow: `\x1b[103m${args.join(" ")}\x1b[0m`,
  bgBrightBlue: `\x1b[104m${args.join(" ")}\x1b[0m`,
  bgBrightMagenta: `\x1b[105m${args.join(" ")}\x1b[0m`,
  bgBrightCyan: `\x1b[106m${args.join(" ")}\x1b[0m`,
  bgBrightWhite: `\x1b[107m${args.join(" ")}\x1b[0m`,
});

module.exports = {
  colors,
  getColor,
  colorize,
};
