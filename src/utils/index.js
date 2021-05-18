import chalk from "chalk";

export const log = {
  warn: (msg) => {
    console.log("%s", chalk.yellow(msg));
  },
  error: (msg) => {
    console.log("%s", chalk.red(msg));
  },
  suc: (msg) => {
    console.log("%s", chalk.green(msg));
  },
};
