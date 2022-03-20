import '../../css/chat/chatting.css';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const socket = io.connect('http://localhost:8080', {
  forceNew: true,
});

function Chatting() {
  /** 문의하기 버튼으로 넘어왔을 경우 */
  const location = useLocation();
  /* 내정보  */
  const [myInfo, setMyInfo] = useState('');
  /* 채팅 정보 가져오기 */
  const [myChat, setMyChat] = useState([]);
  /* input 메시지 하나하나 */
  const [message, setMessage] = useState('');

  /*소켓 실시간 데이터 */
  const [chatList, setChatList] = useState([]);

  /*채팅 한개 데이터 뽑기 */
  const [oneChat, setOneChat] = useState([]);

  /* user이름바꾸기 */
  const [username, setUsername] = useState();

  const messageBoxRef = useRef();

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [oneChat]);

  let opponentUserId = useRef();
  let opponentUsername = useRef();
  if (location.state) {
    opponentUserId.current = location.state.userId;
    opponentUsername.current = location.state.username;
  }

  /* 내정보 가져오기 */
  useEffect(() => {
    axios.get('/auth/myInfo').then((result) => {
      socket.emit('login', { userId: result.data.userId });
      setMyInfo(result.data);
      setUsername(opponentUsername.current);
      axios.get('/chat/chatList').then((chat) => {
        if (chat.data.data.length > 0) {
          setMyChat(chat.data.data);
          if (location.state) {
            chat.data.data.filter((data) => {
              if (
                (data.user === result.data.userId ||
                  data.user === opponentUserId.current) &&
                (data.peerUserId === result.data.userId ||
                  data.peerUserId === opponentUserId.current)
              ) {
                setOneChat(data.chatMessage);
              }
            });
          }
        }
      });
    });
  }, []);

  /* 이전 채팅 리스트 가져오기 */
  useEffect(() => {}, []);

  /* input 변경값 */
  const onMessage = (event) => {
    setMessage(event.target.value);
  };

  //   엔터누르면 전송
  const onCheckEnter = (e) => {
    console.log(message);
    if (e.key === 'Enter' && message !== '') {
      sendMessage();
    }
  };

  /* 전송 클릭 시 */
  const sendMessage = () => {
    console.log(opponentUserId.current);
    /* DB 저장용 데이터 */
    const postData = {
      user: myInfo.userId,
      username: myInfo.userName,
      peerUserId: opponentUserId.current,
      peerUsername: opponentUsername.current,
      chatMessage: [
        {
          senderId: myInfo.userId,
          senderName: myInfo.userName,
          recepient: opponentUserId.current,
          data: message,
        },
      ],
    };

    axios.post('/chat/insertChat', postData).then((result) => {});

    /* 소켓용 데이터 */
    const sendMessage = {
      senderId: myInfo.userId,
      senderName: myInfo.userName,
      recepient: opponentUserId.current,
      data: message,
    };
    setOneChat([...oneChat, sendMessage]);
    setChatList([...chatList, sendMessage]);
    setMessage('');
    socket.emit('chatting', { message: sendMessage });
  };

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data);
      setChatList([...chatList, data]);
      setOneChat([...oneChat, data]);
    });
  }, [oneChat]);

  /* 이름 클릭시 */
  const onChangeChatting = (
    userId,
    opponentUserInfoId,
    username1,
    username2
  ) => {
    if (myInfo.userId === userId) {
      opponentUserId.current = opponentUserInfoId;
      opponentUsername.current = username2;
      setUsername(username2);
    } else {
      opponentUserId.current = userId;
      opponentUsername.current = username1;
      setUsername(username1);
    }
    const result = myChat.filter((chat) => {
      if (chat.user === userId && chat.peerUserId === opponentUserInfoId) {
        return true;
      }
    });
    setOneChat(result[0].chatMessage);
  };

  /**HTML 부분 */
  return (
    <>
      <div className="chatting">
        <div className="chatting__list">
          <ul>
            {myChat &&
              myChat.map((chatList, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      onChangeChatting(
                        chatList.user,
                        chatList.peerUserId,
                        chatList.userName,
                        chatList.peerUsername
                      );
                    }}
                  >
                    {myInfo.userId === chatList.user
                      ? chatList.peerUsername
                      : chatList.username}
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="wrapper">
          <div className="user-container">
            {console.log(opponentUsername)}
            {username === undefined ? '없음' : username}
          </div>
          <div className="display-container" ref={messageBoxRef}>
            <ul className="chatting-list">
              {}
              {oneChat &&
                oneChat.map((chat, i) => {
                  return (
                    <>
                      {chat.senderId === myInfo.userId ? (
                        <li className="sent">
                          <span className="profile">
                            <span className="message">{chat.data}</span>
                            <span className="time">오후 2:10</span>
                          </span>
                        </li>
                      ) : (
                        <li className="received">
                          <span className="profile">
                            <span className="user">
                              <span className="user">{chat.senderName}</span>
                              <img
                                className="image"
                                src="https://placeimg.com/50/50/any"
                                alt="any"
                              />
                            </span>
                            <span className="message">{chat.data}</span>
                            <span className="time">오후 2:10</span>
                          </span>
                        </li>
                      )}
                    </>
                  );
                })}
            </ul>
          </div>
          <div className="input-container">
            <span>
              <input
                type="text"
                className="chatting-input"
                value={message}
                onChange={onMessage}
                onKeyPress={onCheckEnter}
              />
              <button
                className="send-button"
                onClick={(event) => {
                  sendMessage(event);
                }}
              >
                전송
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatting;
