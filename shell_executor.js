const execSync = require("child_process").execSync;

// 유저가 넘긴 명령어 라인을 받아온다.
async function shell(command) {
  // 쉘 명령어를 수행하면 결과 문자열이 stdout에 담긴다.
  const { stdout, stderr } = await exec(command);

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`${stdout}`);
  return stdout;
}

module.exports.shell = (command) => {
  console.log("start");
  let stdout = "";

  try {
    stdout = execSync(command).toString;
  } catch (e) {
    stdout = e;
  }

  console.log(stdout);
  return stdout;
};
