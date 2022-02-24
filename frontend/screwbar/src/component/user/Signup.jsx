import { useState } from "react";
import { signupAction } from "../../action/auth";
import { Link, useNavigate } from 'react-router-dom';

import "../../css/user/signup.css"
import axios from "axios";
import { useEffect } from "react";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const [certificationBtn, setCertificationBtn] = useState(false);
    const [labelCheck, setLabelCheck] = useState(false);
    const [disabledCheck, setDisabledCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(true);
    const [passwordCheck, setPasswordCheck] = useState(true);
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
    }
    useEffect(() => {
        if(password !== password2) {
            setPasswordCheck(false);
        } else {
            setPasswordCheck(true);
        }
    }, [password2]);

    const onBirthdayChange = (event) => {
        setBirthday(event.target.value);
    }
    
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }
    useEffect(() => {
        let userEmailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(email && userEmailExp.test(email) === false) {
            setEmailCheck(false);
        } else {
            setEmailCheck(true);
        }
    }, [email])

    const onUsernameChange = (event) => {
        setUserName(event.target.value);
    }

    const getCertification = () => {
        const data = {
            phoneNumber: phonenumber
        }
        axios.post("/auth/getVerificationCode", data).then((result) => {
            setCertificationBtn(true);
            alert(result.data.message);
        }).catch((error) => {
            console.log(error);
        })
    }

    const onCertificationNumberChanged = (event) => {
        const  data = {
            phoneNumber: phonenumber,
            checkVerificationCode: event.target.value
        }
        axios.post("/auth/checkVerificationCode", data).then((result) => {
            console.log(result);
            if(result.data.message === "success") {
                setDisabledCheck(true);
                setLabelCheck(true);
            } else {
                setLabelCheck(false);
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    //회원가입 클릭시
    const  signup = () => {
        if(!email || !emailCheck) {
            alert("이메일을 입력해주세요");
            return;
        }
        if(!username) {
            alert("이름을 입력해주세요");
            return;
        }
        
        const data = {
            email: email,
            username: username,
            password: password,
            address: address,
            phoneNumber: phonenumber,
            birthday: birthday,
        };
        axios.post("/auth/signup", data)
        .then((result) => {
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
            <div>
                <label className="signup__label">이메일</label>
                <input
                type="text"
                className="signup__email"
                maxLength={25}
                onChange={onEmailChange}
                />
            </div>
            {emailCheck === false ? <small className="signup__small">이메일 형식으로 입력해주세요</small> : null}
            <div>
                <label className="signup__label">이름</label>
                <input
                type="text"
                className="signup__username"
                maxLength={15}
                onChange={onUsernameChange}
                />
            </div>
            <div>
                <label className="signup__label">비밀번호</label>
                <input type="password" id="signup__password" className="signup__password" onChange={onPasswordChanged} maxLength={25} />
            </div>
            <div>
                <label className="signup__label">비밀번호 확인</label>
                <input type="password" id="signup__password2" className="signup__password2" onChange={onPasswordChanged2} maxLength={25}/>
            </div>
            {passwordCheck === false ? <small className="signup__small">비밀번호가 일치하지 않습니다.</small> : null}
            <div>
                <label className="signup__label">주소</label>
                <input type="text" className="signup__address" onChange={onAddressChanged} maxLength={25}/>
            </div>
            <div>
                <label className="signup__label">전화번호</label>
                <input type="text" className="signup__phone" onChange={onPhoneNumberChanged} maxLength={25}/>
                <button className="signup__certificationBtn" onClick={getCertification}>인증번호 받기</button>
            </div>
            <div>
                <label className="signup__label">인증확인</label>
                <input type="text" className="signup__phone" onChange={onCertificationNumberChanged} maxLength={25} disabled={disabledCheck}/>
            </div>
            {labelCheck === true ? <label>인증되었습니다</label> : ""}
            <div>
                <label className="signup__label">생년월일</label>
                <input type="text" className="signup__birthday" onChange={onBirthdayChange} maxLength={25}/>
            </div>
        <button className="signup__signupBtn" onClick={signup}>회원가입</button>
        </section>
    </>
    )
}

export default Signup;