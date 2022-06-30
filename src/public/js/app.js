const messageList = document.querySelector("ul"); 
// querySelector 메소드 : 목록과 입력 폼을 각각 선택 후 적절한 이름 부여
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){ // 입력값 유형, 입력값을 인자로 전달 받음 -> JSON -> 문자열로 변환
    const msg = { type, payload };
    return JSON.stringify(msg); // JSON.stringify 메서드 -> JSON을 문자열로 변환
}

socket.addEventListener("open", () => {
    console.log("Connect to Server")
}); // "open" 이벤트 -> 서버에 연결

socket.addEventListener("message", (message) => {
    const li = document.createElement("li"); // 메시지가 전달될 때마다 새로운 Element 객체(li요소) 생성
    // document.createElement 메서드 -> 새로운 Element 객체 생성
    li.innerText = message.data; // 생성된 li요소의 텍스트 속성에 message 객체의 data 반영
    messageList.append(li); // 생성된 li 요소를 home.pug의 ul 안에 추가
}); // "message" 이벤트 -> 메시지 전달 : 메시지를 전달 받아서 콘솔에 출력

socket.addEventListener("close", () => {
    console.log("Disconnected from Server")
}); // "close" 이벤트 -> 서버 오프라인 상태

function handleSubmit(event){ 
    // handleSubmit 함수 : 입력 폼에서 submit 이벤트가 발생했을 때 동작으로 등록
    event.preventDefault(); 
    // 이벤트를 취소하는 메소드 -> 이벤트가 제공하는 원래 기능을 사용하지 않으려고 할 때 사용
    const input = messageForm.querySelector("input"); 
    socket.send(makeMessage("new_message", input.value)); // 입력된 내용을 소켓을 이용해 전송
    input.value = ""; // 전송 후 입력 필드의 내용을 삭제(초기화)
}

function handleNickSubmit(event){
    // handleNickSubmit 함수 : Nick 입력 폼에서 submit 이벤트가 발생했을 때 동작으로 등록
    event.preventDefault();
    // 이벤트를 취소하는 메소드 -> 이벤트가 제공하는 원래 기능을 사용하지 않으려고 할 때 사용
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value)); // makeMessage함수 결과값 -> 소켓을 이용해 전송
    input.value = ""; // 전송 후 입력 필드의 내용을 삭제(초기화)
}

messageForm.addEventListener("submit", handleSubmit); 
// submit 이벤트 발생 -> 콜백 함수(handleSubmit)에 이벤트 전달
nickForm.addEventListener("submit", handleNickSubmit);
// 닉네임 폼에서 닉네임 입력 -> submit 이벤트 발생 -> handleNickSubmit 함수 호출