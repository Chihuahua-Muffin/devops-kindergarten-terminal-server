const util = require("util");
const exec = util.promisify(require("child_process").exec);

// 유저가 넘긴 명령어 라인을 받아온다.
let command = "ls -l";

async function main() {
  // 쉘 명령어를 수행하면 결과 문자열이 stdout에 담긴다.
  const { stdout, stderr } = await exec(command);

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`${stdout}`);
}

main();
