import fs from "fs";
import execa from "execa";
import { log, createLoading } from "./utils";
import config from "../config";
import * as child_process from "child_process";
import * as inquirer from "inquirer";
import chalk from "chalk";

const repositoryName = config.repository.name;
const repositoryDir = config.repository.dir;
const promptList = [
  {
    type: "list",
    message: "连接的开发环境：",
    name: "env",
    choices: ["dev","staging"],
  },
  {
    type: "input",
    message: "请输入租户code 码：",
    name: "code",
		default: "o"
  },
];
export async function createWXConfig(options) {
  inquirer.prompt(promptList).then((answers) => {
		console.log(`${chalk.blue(`配置文件基于, ${answers.env}环境，${answers.code}租户生成。`)}`);
		log.suc("")
		log.suc("开始创建配置文件。。。")
		log.suc("")
  });
}
