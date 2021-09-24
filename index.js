const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const shell_executor = require("./shell_executor");

// 접속한 유저의 id를 받아온다.
let userid = 1;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`user ${userid} connected`);
  socket.on("chat message", (inputmsg) => {
    // socketId를 지정해주지 않으면 메세지가 브로드 캐스팅한다.
    // 따라서 메세지를 보낸 id를 기억해야 한다.
    const shellmsg = shell_executor.shell(inputmsg);

    // console.log(shellmsg);
    // io.to(socket.id).emit(shellmsg);
    io.emit("chat message", shellmsg);
  });

  socket.on("disconnect", () => {
    console.log(`user ${userid} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("Connected at 3000");
});
