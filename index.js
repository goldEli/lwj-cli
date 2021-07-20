import { createProject } from "./src/createProject";
import arg from "arg";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--npm": Boolean,
      "--help": Boolean,
      "-n": "--npm",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    useNpm: args["--npm"],
    help: args["--help"],
    command: args._[0]
  };
}

export async function run(args) {
  let options = parseArgumentsIntoOptions(args);
  if (options.help) {
    console.log("Usage: lwj <command> [options]");
    console.log();
    console.log("Options:");
    console.log("\t--help\toutput usage information");
    console.log("\t--npm\tuse npm (use yarn by default)");
    console.log();
    console.log("Commands:");
    console.log("\tcreate\t创建渐进式taro项目");
    console.log("\twatch\t文件监听");
    return;
  }
  switch (options.command) {
    case "create":
      await createProject(options);
      break;
    case "watch":
      await createProject(options);
      break
    default:
      break;
  }
}
