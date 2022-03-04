import axios from 'axios';
import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
const socket =  io.connect('http://localhost:8080', {
  forceNew:true
})

socket.on('connect', () => {
  console.log("웹 소켓에 서버에 연결됨")
});

socket.on('disconnect', () => {
  console.log("웹 소켓 연결 종료");
})

socket.on('message', (message) => {
  console.log("수신 ->" + JSON.stringify(message));
});

socket.on('response', (input) => {
  console.log("응답 =>" + JSON.stringify(input));
});



// console.log(socket);

function Chat() {
  const [chat, setChat] = useState("");
  const [myInfo, setMyInfo] = useState("");

  useEffect(() => {
    axios.get("/auth/myInfo").then((result) => {
        setMyInfo(result.data);
        console.log(result.data)
        socket.emit('login', result.data.userId);
    })
}, []);


  const onMessage = (event) => {
    setChat(event.target.value);
  }

  const sendMessage = () => {
    let sender = "이종민";
    let recepient = "4f8460c4-846e-4377-a80d-9d4456699bdc";
    let data = chat;
    let message = {
      sender: sender,
      recepient: recepient,
      command:'chat',
      type:'text',
      data:data
    }
    socket.emit('message', message);
  }








  return (
    <div className='card'>
      <h3>채팅 클라이언트</h3>
      <input type="text" name="" id="" onChange={onMessage} />
      <button onClick={sendMessage}>전송
      </button>
    </div>
  );
}

export default Chat;