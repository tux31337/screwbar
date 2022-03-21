import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chatting from "./Chatting";
import ChattingTest2 from "./ChattingTest2";

const ChattingTest = () => {

    /* 채팅 정보 가져오기 */
    const [myChat, setMyChat] = useState([]);
    const [myInfo, setMyInfo] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        axios.get("/chat/chatList").then((chat) => {
            if(chat.data.data.length > 0) {
              setMyChat(chat.data.data);
            }
          });
    }, [])

    const onChangeChatting = (chatList) => {
        console.log(chatList);
        setUserId("123");
    }

    return(
        <>
        <div className="chatting">
            <div className="chatting__list">
                <ul>
                    {myChat && myChat.map((chatList, i) => {
                        return(
                            <li key={i} onClick={() =>  (chatList)}>
                                <Link to="/chattingTest" state={{data: chatList}}>{myInfo.userId === chatList.user ? chatList.peerUsername : chatList.username}</Link>
                            </li>
                        )
                    })}

                </ul>
            </div>
            <ChattingTest2></ChattingTest2>
            </div>
        </>
    )
}

export default ChattingTest;
