/* import axios from 'axios';
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

  if(location.state) {
    
  }

  
  useEffect(() => {
    axios.get("/auth/myInfo").then((result) => {
        setMyInfo(result.data);
        socket.emit('login', result.data.userId);
    })
}, []);


  const onMessage = (event) => {
    setChat(event.target.value);
  }

  const sendMessage = () => {
    let sender = myInfo.userName;
    let recepient = userId;
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

    <section className='chat'>
      <div className='chat__user'>
          <div className='chat__user__userName'>
            {myInfo.userName && myInfo.userName}
          </div>
      </div>
      <div className='chat__message'>
          <div className='chat__user__peerName'>
            {username}
          </div>
          <input type="text" name="" id="" onChange={onMessage} />
          <button onClick={sendMessage}>전송</button>
      </div>
    </section>
  );
}

export default Chat; */
