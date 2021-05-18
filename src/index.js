import {createProject} from "./createProject"

export async function run(args) {
//   let options = parseArgumentsIntoOptions(args);
//   options = await promptForMissingOptions(options);
//   console.log(options);
  await createProject();
}
