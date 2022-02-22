import { useState } from "react";
import { signupAction } from "../../action/auth";
import { Link, useNavigate } from 'react-router-dom';

import "../../css/user/signup.css"
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const navigate = useNavigate();


    const onAddressChanged = (event) => {
        setAddress(event.target.value);
    }

    const onPhoneNumberChanged = (event) => {
        setPhoneNumber(event.target.value);
    }

    const onPasswordChanged = (event) => {
        setPassword(event.target.value);
    }

    const onPasswordChanged2 = (event) => {
        setPassword2(event.target.value);
        if(password !== password2) {
            console.log("비밀번호가 맞지않습니다")
        }
    }

    const onBirthdayChange = (event) => {
        setBirthday(event.target.value);
    }
    
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onUsernameChange = (event) => {
        setUserName(event.target.value);
    }

    const  signup = () => {
        const data = {
            email: email,
            username: username,
            password: password,
            address: address,
            phoneNumber: phonenumber,
            birthday: birthday,
        };
        axios.post("http://127.0.0.1:8080/auth/signup", data)
        .then((result) => {
            console.log(result);
            alert("회원가입에 성공하셨습니다. 로그인을 진행해주세요");
            navigate('/login');
        }).catch((error) => {
            alert(error.response.data.message);
        })


    }




    return(
        <>
    <section className="signup">
        <div>
            <img src="img/screwbar.png"></img>
        </div>
        <label className="signup__label">이메일</label>
        <input
          type="text"
          className="signup__phone"
          onChange={onEmailChange}
        />
        <label className="signup__label">이름</label>
        <input
          type="text"
          className="signup__username"
          onChange={onUsernameChange}
        />
        <label className="signup__label">비밀번호</label>
        <input type="password" id="signup__password" className="signup__password" onChange={onPasswordChanged}/>
        <label className="signup__label" >비밀번호 확인</label>
        <input type="password" id="signup__password2" className="signup__password2" onChange={onPasswordChanged2}/>
        <label className="signup__label">주소</label>
        <input type="text" className="signup__address" onChange={onAddressChanged}/>
        <label className="signup__label">전화번호</label>
        <input type="text" className="signup__phone" onChange={onPhoneNumberChanged}/>
        <label className="signup__label">생년월일</label>
        <input type="text" className="signup__birthday" onChange={onBirthdayChange}/>
      <button className="signup__signupBtn" onClick={signup}>회원가입</button>
    </section>
        </>
    )
}

export default Signup;