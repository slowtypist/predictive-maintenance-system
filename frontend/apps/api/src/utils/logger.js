const timestamp = () => new Date().toISOString();

const formatArgs = (args) => [timestamp(), ...args];

const logger = {
  info: (...args) => console.log(...formatArgs(args)),
  warn: (...args) => console.warn(...formatArgs(args)),
  error: (...args) => console.error(...formatArgs(args)),
};

export default logger;
