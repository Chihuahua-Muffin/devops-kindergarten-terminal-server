const exec = require("child_process").exec;

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
  let msg = "";
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${stderr}`);
    }
    console.log(`stdout : ${stdout}`);
    console.error(`stderr : ${stderr}`);
    msg = stdout;
  });
  return msg;
};
