import path from "path";

const repositoryName = "shop-sales-wx-app-next";
const repositoryDir = path.resolve(process.cwd(), repositoryName);
const config = {
    repository: {
        name: repositoryName,
        dir: repositoryDir,
        gitUrl: "git@github.com:goldEli/shop-sales-wx-app-next.git"
    }
}

export default config