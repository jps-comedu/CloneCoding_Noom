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
const server = http.createServer(app); 
// Node.js에 기본으로 내장된 HTTP 패키지를 사용해서 express로 만든 서버 애플리케이션 제공
const wss = new WebSocket.Server({ server });
// 웹 소켓 서버를 생성하면서 여기에 HTTP서버를 전달

const sockets = []; // 가짜 데이터베이스에서 활용할 배열 생성

wss.on("connection", (socket) => {
   sockets.push(socket); // 웹소켓 서버에 connection이벤트 발생때마다 배열에 생성된 소켓 추가
   console.log("Connected to Browser"); 
   socket.on("close", () => console.log("Disconnected from Browser"));
   // close 이벤트 발생 -> 서버쪽 콘솔에 메시지 출력
   socket.on("message", (message) => { // message 이벤트 -> 콜백 함수는 message를 전달 받음
    sockets.forEach(asocket => asocket.send(`${message}`));
    // forEach메소드: 배열의 각 요소에 차례로 접근해서 구문을 실행해주는 메소드
    // message 이벤트 발생 -> sockets의 모든 소켓에 차례로 접근해 메시지 발송
   });  
});
// handleConection 함수를 선언한 다음에 on 메소드에 인자로 전달 
// -> 같은 역할을 하는 익명함수를 만들어 on 메소드에 포함
// connection 이벤트가 발생했을 때 소켓을 받는 다는 것을 직관적으로 표시

server.listen(3000, handleListen);