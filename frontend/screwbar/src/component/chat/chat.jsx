import axios from 'axios';
import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import "../../css/chat/chat.css"
import { useLocation } from 'react-router-dom';



const socket =  io.connect('http://localhost:8080', {
  forceNew:true,
});



function Chat() {
  const location = useLocation();


  let peerUserId;
  let peerUsername;
  if(location.state) {
    peerUserId = location.state.userId;
    peerUsername = location.state.username;
  }

  //내정보가지고오기
  const [myInfo, setMyInfo] = useState("");
  //채팅 메시지 input change
  const [message, setMessage] = useState("");

  
  const [previoustChat, setPreviousChat] = useState();
  const [myChat, setMyChat] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  
  let roomId = false;


  useEffect(() => {
    axios.get("/auth/myInfo").then((result) => {
      socket.emit('login', {userId: result.data.userId})
      setMyInfo(result.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/chat/chatList").then((result) => {
      if(result.data.length > 0) {
        setChatRoom(result.data.data);
        setPreviousChat(result.data.data[0].chatMessage);
      }
    });
  }, [])

  const onMessage = (event) => {
    setMessage(event.target.value);
  }

  const sendMessage = () => {
    let senderId = myInfo.userId;
    let recepient = peerUserId;
    let data = message;
    setMyChat([...myChat, message]);

    const postData = 
    {
      "user":  myInfo.userId,
      "username" : myInfo.userName,
      "peerUserId" : peerUserId,
      "peerUsername": peerUsername,
      "chatMessage" : [{
        "user": myInfo.userName,
        "peerUser": peerUsername,
        "message" : message,
      }]
    }
    
    let sendMessage = {
      senderId: senderId,
      senderName: myInfo.userName,
      recepient: recepient,
      data:data
    }
    setChatList([...chatList, sendMessage]);
    socket.emit("chatting", {message: sendMessage});
  }

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      setChatList([...chatList, data]);
    })
  }, [chatList]);


  const onChangeChatting = (id) => {
    console.log(id);
  }
  // const test2 = chatRoom && chatRoom.filter((data) => {
  //   data.peerUserId === peerUserId;
  // })

  const test2 = chatRoom && chatRoom.filter((data) => {
    return data.peerUserId === peerUserId || data.user === peerUserId;
  })
  
  let test;
  return (
    <section className='chat'>
      <div className='chat__user'>
          <div className='chat__user__userName'>
            {myInfo.userName}
          </div>
          <div className='chat__chatList'>
            <ul>
            {
              chatRoom && chatRoom.map((data) => {
                console.log(data);
                return(
                  <>
                    <li onClick={() => {onChangeChatting(data._id)}}>{data.username === myInfo.username ? data.peerUsername : data.username}</li>
                  </>
                )
              })
            }
            </ul>
          </div>
      </div>

      <div className='chat__message'>
          <div className='chat__user__peerName'>
            {peerUsername ? peerUsername : null}
            <div>
              {/* {whisper ? whisper.senderName : null} : {whisper ? whisper.data : null} */}
              <ul className='chat__message__ul'>
              
                <li>
                {test2 === null ? test.message : "채팅시작"}
                </li>
              
              {/* {
                previoustChat && previoustChat.map((data) => {
                  return(
                  <>
                    <li>{data.user === myInfo.userName ? null : data.user}</li>
                    <li className={data.user === myInfo.userName ? 'chat__message__me' : 'chat__message__other'}>{data.message}</li>
                  </>
                )
                })
              }
              {chatList.map((data) => {
                return (
                <>
                <li>{data.senderName === myInfo.userName ? null : data.senderName}</li>
                <li className={data.senderName === myInfo.userName ? 'chat__message__me' : 'chat__message__other'}>{data.data}</li>
                </>
                )
              })} */}
              </ul>
            </div>
          </div>
          <input type="text" name="" id="" onChange={onMessage} />
          <button onClick={(event) => {
            sendMessage(event);
          }}>전송</button>
      </div>
    </section>
  );
}


export default Chat;