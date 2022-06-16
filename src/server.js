// console.log("hello");
import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");
// app.listen(3000, handleListen);
const server = http.createServer(app); 
// Node.js에 기본으로 내장된 HTTP 패키지를 사용해서 express로 만든 서버 애플리케이션 제공
const wss = new WebSocket.Server({ server });
// 웹 소켓 서버를 생성하면서 여기에 HTTP서버를 전달

/* function handleConnection(socket){
    console.log(socket);
}; 
// wss의 on메소드에서 전달한 socket을 받기 위해 매개변수(socket)를 정의함.
// socket -> 사용자와 서버 사이의 연결 또는 그에 대한 정보를 의미
// console.log(socket) -> socket의 내용 확인

wss.on("connection", handleConnection);
// 웹 소켓 서버 wss의 on 메소드 -> "connetcion" 이벤트 발생시 -> 콜백 함수 handleConnection 호출
// on 메소드는 콜백 함수에 socket을 전달
*/

wss.on("connection", (socket) => {
   // console.log(socket);
   console.log("Connected to Browser"); 
   socket.on("close", () => console.log("Disconnected from Browser")); // close 이벤트 발생 -> 서버쪽 콘솔에 메시지 출력
   socket.on("message", (message) => { // message 이벤트 -> 콜백 함수는 message를 전달받아 콘솔에 출력
    console.log(`${message}`);
   });
   socket.send("hello!!"); // socket의 send 메소드로 메시지 전달, 서버 -> 사용자(프런트엔드)
}); 
// handleConection 함수를 선언한 다음에 on 메소드에 인자로 전달 -> 같은 역할을 하는 익명함수를 만들어 on 메소드에 포함
// connection 이벤트가 발생했을 때 소켓을 받는 다는 것을 직관적으로 표시

server.listen(3000, handleListen);