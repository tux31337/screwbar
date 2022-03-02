import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';


const socket =  io.connect('http://localhost:8080')

function Chat() {
  const [message, setMessage] = useState("");


  const onMessage = (event) => {
    setMessage(event.target.value);
  }

  const done = (msg) => {
    console.log(msg);
  }

  const sendMessage = (event) => {
    console.log(message);
    //socket.emit("enter_room", {payload: message}, () => console.log("SERVER IS DONE"));
    socket.emit("enter_room", message, done);


    setMessage("");
  }

  socket.on("welcome", () => {
    console.log("누군가왔음");
  });







  return (
    <div className='card'>
      <input type="text" name="" id="" onChange={onMessage} />
      <button onClick={sendMessage}>전송
      </button>
    </div>
  );
}

export default Chat;