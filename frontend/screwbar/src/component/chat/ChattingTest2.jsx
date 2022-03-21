import { useRef } from "react";
import { useLocation } from "react-router-dom";

const ChattingTest2 = (props) => {
    const location = useLocation();
    let opponentUserId = useRef();
    let opponentUsername = useRef();

    return(
        <>
        {console.log(location.state)}
        <div className = "wrapper">
                <div className = "user-container">
                    </div>
                        <div className="display-container">
                            <ul className="chatting-list">
                                {
                     
                                         <>
                                            
                                                <li className="sent">
                                                    <span className="profile">
                                                        <span className="message"></span>
                                                        <span className="time">오후 2:10</span>
                                                    </span>
                                                </li> 
                                                <li className="received">
                                                    <span className="profile">
                                                        <span className="user">
                                                        <span className="user"></span>
                                                        <img className="image" src="https://placeimg.com/50/50/any" alt="any" />
                                                        </span>
                                                            <span className="message"></span>
                                                            <span className="time">오후 2:10</span>
                                                    </span>
                                                </li>
                                            
                                         </>   
                                        
                                   
                                }
                            </ul>
                        </div>
                        <div className="input-container">
                            <span>
                                <input type="text" className="chatting-input" />
                                <button className="send-button">전송</button>
                            </span>
                </div>
            </div>
        </>
    )
}

export default ChattingTest2;
