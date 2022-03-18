import axios from "axios";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";

import { signupAction } from "../../action/auth";
import "../../css/user/signup.css"
import DaumPost from "./Daumpost";

function NewPw() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const [labelCheck, setLabelCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailDuplicateCheck, setEmailDuplicateCheck] = useState("");
    const [radioValue, setRadioValue] = useState("남");
    const [birthdayYear, setBirthdayYear] = useState("");
    const [birthdayMonth, setBirthdayMonth] = useState("");
    const [birthdayDate, setBirthdayDate] = useState("");


    const [passwordCheck, setPasswordCheck] = useState(true);
    const navigate = useNavigate();

    const onAddressChanged = (event) => {
        setAddress(event.target.value);
    };

    const onPhoneNumberChanged = (event) => {
        setPhoneNumber(event.target.value);
    };

    const onPasswordChanged = (event) => {
        setPassword(event.target.value);
    };

    const onPasswordChanged2 = (event) => {
        setPassword2(event.target.value);
    };

    const onAddressDetail = (event) => {
        setAddressDetail(event.target.value);
    }

    useEffect(() => {
        if (password !== password2) {
            setPasswordCheck(false);
        } else {
            setPasswordCheck(true);
        }
    }, [password2]);


    useEffect(() => {
    }, [address]);



    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const location = useLocation();
    const email = location.state.email;

    //회원가입 클릭시
    const changePw = () => {
        if (password === "") {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (password2 === "") {
            alert("비밀번호를 한번 더 입력해주세요");
            return;
        }
        if (!passwordCheck) {
            alert("비밀번호가 같은지 확인해주세요");
            return;
        }

        console.log(email);
        const data = {
            email : email,
            password : password
        }
        
        axios.post("/auth/changePassword", data)
        .then((result) => {
            console.log(result);
            alert("비밀번호가 변경되었습니다.");
            navigate('/login');
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }
    return (
        <>
            <section className="signup">
                <div className="signup__title">
                    <h2 className="signup__title__h2">비밀번호 변경</h2>
                </div>
                <small className="signup__title__span"><span className="signup__necessary">*</span>필수 입력 사항</small>
                <div className="signup__hr" />
                <section className="signup__form">

                    <div className="signup__form__password">
                        <label>비밀번호<span className="signup__necessary">*</span></label>
                        <input type="password" onChange={onPasswordChanged} />
                    </div>
                    <div className="signup__form__passwordConfrim">
                        <label>비밀번호 확인<span className="signup__necessary">*</span></label>
                        <input type="password" onChange={onPasswordChanged2}></input>
                    </div>
                    {passwordCheck === false ? <ul className="signup__form__emailCheck"><ol></ol><small className="signup__small">❌ 비밀번호가 일치하지 않습니다.</small></ul> : null}
                    {
                        isPopupOpen && <DaumPost address={address} setAddress={setAddress} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}></DaumPost>
                    }
                    <div className="signup__form__registDiv">
                        <button className="register__btn" onClick={changePw}>비밀번호 변경</button>
                    </div>

                </section>
            </section>
        </>
    )
}
export default NewPw;