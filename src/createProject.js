import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import { log, createLoading } from "./utils";

const repositoryName = "shop-sales-wx-app-next";
const repositoryDir = path.resolve(process.cwd(), repositoryName);
async function updateRepo() {
  const loading = createLoading("项目代码更新");
  try {
    const result = await execa("git", ["pull", "--rebase"], {
      cwd: repositoryDir,
    });

    if (result.failed) {
      loading.fail();
      return Promise.reject(new Error("项目代码更新失败"));
    }
    loading.succeed();
  } catch (error) {
    console.error(error);
    loading.fail();
  }
}

// 克隆项目
async function cloneRepo() {
  const loading = createLoading("项目代码下载");
  const result = await execa("git", [
    "clone",
    "git@github.com:goldEli/shop-sales-wx-app-next.git",
  ]);
  if (result.failed) {
    loading.fail();
    return Promise.reject(new Error("项目代码下载失败"));
  }
  loading.succeed();
}

// 安装依赖
async function install(useNpm) {
  const loading = createLoading("项目依赖安装");
  const commands = useNpm ? ["npm", ["install"]] : ["yarn"];
  const result = await execa(...commands, {
    cwd: repositoryDir,
  });
  if (result.failed) {
    loading.fail();
    return Promise.reject(new Error("依赖安装失败"));
  }
  loading.succeed();
}

// 启动
// async function start() {
//   const loading = createLoading("启动项目");
//   const result = await execa(
//     "taro",
//     ["build", "--type", "weapp", "--blended", "--watch"],
//     {
//       cwd: repositoryDir,
//     }
//   );
//   if (result.failed) {
//     loading.fail();
//     return Promise.reject(new Error("依赖安装失败"));
//   }
//   loading.succeed();
// }

export async function createProject(options) {
  console.log("   ");
  console.log(`开始创建项目: ${repositoryName}`);
  console.log("   ");
  console.log("   ");
  if (fs.existsSync(repositoryDir)) {
    await updateRepo();
  } else {
    await cloneRepo();
  }
  await install(options.useNpm);
  //   await start()
  console.log("   ");
  console.log("   ");
}
