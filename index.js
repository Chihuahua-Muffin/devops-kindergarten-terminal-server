const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    //  origin: ["http://211.36.133.104:3000, http://localhost:3000, http://39.119.241.95:3000"],
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const shell_executor = require("./shell_executor");

app.use(require("cors")());

// 접속한 유저의 id를 받아온다.
let userid = 1;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", shell_executor);

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
