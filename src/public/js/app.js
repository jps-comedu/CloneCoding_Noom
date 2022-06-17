// alert("hi!");
// const socket = new WebSocket("http://localhost:3000");
const messageList = document.querySelector("ul"); // querySelector 메소드 : 목록과 입력 폼을 각각 선택 후 적절한 이름 부여
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connect to Server")
}); // "open" 이벤트 -> 서버에 연결

socket.addEventListener("message", (message) => {
    console.log("Just got this:", message.data, "from the server") 
    // message 객체의 data속성 -> 전달된 메시지 반환
}); // "message" 이벤트 -> 메시지 전달 : 메시지를 전달 받아서 콘솔에 출력

socket.addEventListener("close", () => {
    console.log("Disconnected from Server")
}); // "close" 이벤트 -> 서버 오프라인 상태

/*
setTimeout(() => {
    socket.send("hello from browser!");
}, 5000); // setTimeout 메소드 -> 5000밀리초(5초) 후에 사용자에서 서버에게 메시지 전송
*/

function handleSubmit(event){ // handleSubmit 함수 : 입력 폼에서 submit 이벤트가 발생했을 때 동작으로 등록
    event.preventDefault(); // 이벤트를 취소하는 메소드 -> 이벤트가 제공하는 원래 기능을 사용하지 않으려고 할 때 사용
    const input = messageForm.querySelector("input"); 
    socket.send(input.value); // 입력된 내용을 소켓을 이용해 전송
    input.value = ""; // 전송 후 입력 필드의 내용을 삭제(초기화)
};

messageForm.addEventListener("submit", handleSubmit); // submit 이벤트 발생 -> 콜백 함수(handleSubmit)에 이벤트 전달