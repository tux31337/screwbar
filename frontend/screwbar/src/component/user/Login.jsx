import "../../css/user/login.css"
import {loginAction} from '../../action/auth.js'
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import token from "../../action/token";



function Login() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const onPhoneNumberChanged = (event) => {
        setPhoneNumber(event.target.value);
        console.log(phoneNumber);
    }
    const onPasswordChanged = (event) => {
        console.log(password);
        setPassword(event.target.value);
    }

    const login = () => {
        console.log(phoneNumber);
        console.log(password);
        loginAction({phoneNumber: phoneNumber, password: password})
        navigate('/');
    }






    return(
        <>
    <section className="login">
        <div>
            <img src="img/screwbar.png"></img>
        </div>
        <label className="login__label">휴대폰 번호</label>
        <input
          type="text"
          className="login__phone"
          onChange={onPhoneNumberChanged}
        />
        <label className="login__label">비밀번호</label>
        <input type="password" id="login__password" className="login__password" onChange={onPasswordChanged} />
        
      <button className="login__loginBtn" onClick={login}>로그인</button>
      <button className="login__signupBtn" onClick={() => navigate('/signup')}>회원가입</button>
      <ul className="login__finddiv">
        <li className="login__finddiv__list"><a>아이디 찾기</a></li>|
        <li className="login__finddiv__list"><a>비밀번호 찾기</a></li>
      </ul>
      
    </section>
        </>
    )
}

export default Login;