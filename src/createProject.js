import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import { log } from "./utils";

// async function initGit(options) {
//     const result = await execa("git", ["init"], {
//       cwd: options.targetDirectory,
//     });
//     if (result.failed) {
//       return Promise.reject(new Error("Failed to initialize git"));
//     }
//     return;
//   }
const repositoryName = "shop-sales-wx-app-next";
const repositoryDir = path.resolve(process.cwd(), repositoryName);
async function updateRepo() {
  const result = await execa("git", [
    "pull", "--rebase"
  ]);
  if (result.failed) {
    return Promise.reject(new Error("仓库更新失败"));
  }
  log.suc("仓库更新完成!");
}

// 克隆仓库
async function cloneRepo() {
  const result = await execa("git", [
    "clone",
    "git@github.com:goldEli/shop-sales-wx-app-next.git",
  ]);
  if (result.failed) {
    return Promise.reject(new Error("仓库下载失败"));
  }
  log.suc("仓库下载完毕!");
}

// 安装依赖
async function install() {
  await execa("cd", [repositoryDir]);
  const result = await execa("yarn");
  if (result.failed) {
    return Promise.reject(new Error("依赖安装失败"));
  }
  log.suc("依赖晚装完毕");
}

// 启动
async function start() {}

export async function createProject() {
  console.log(process.cwd(), fs.existsSync(repositoryDir));
  if (fs.existsSync(repositoryDir)) {
    await updateRepo();
  } else {
    await cloneRepo();
  }
  await install();
}
