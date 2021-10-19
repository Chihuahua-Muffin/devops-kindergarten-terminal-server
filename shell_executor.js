// const execSync = require("child_process").execSync;

const { NodeSSH } = require("node-ssh");

const ssh = new NodeSSH();
const sshConfig = {
  host: "localhost",
  username: "ec2-user",
  privateKey: "./myKey.pem",
};

let userid = 1;

module.exports = async (socket, req) => {
  console.log(`user ${userid} connected`);
  await ssh.connect(sshConfig);
  const shellStream = await ssh.requestShell();
  socket.on("chat message", (msg) => {
    const data = msg.toString;
    shellStream.write(data + "\n");
  });
  // listener
  shellStream.on("data", (data) => {
    socket.emit(data);
    console.log("data : " + data);
  });
  shellStream.stderr.on("data", (data) => {
    socket.emit(data);
    console.log("err : " + data);
  });
  socket.on("disconnect", () => {
    console.log(`user ${userid} disconnected`);
  });
};

// // 유저가 넘긴 명령어 라인을 받아온다.
// async function shell(command) {
//   // 쉘 명령어를 수행하면 결과 문자열이 stdout에 담긴다.
//   const { stdout, stderr } = await exec(command);

//   if (stderr) {
//     console.error(`error: ${stderr}`);
//   }
//   console.log(`${stdout}`);
//   return stdout;
// }

// module.exports.shell = (command) => {
//   let stdout;

//   // 새로운 프로세스를 실행시키는 걸 막는다.
//   if (command.split(" ")[0].includes("vi")) {
//     return `wrong access. you can't use \'vi\' command`;
//   }

//   try {
//     stdout = execSync(command).toString;
//   } catch (ex) {
//     stdout = ex.stdout;
//   }

//   return stdout;
// };
