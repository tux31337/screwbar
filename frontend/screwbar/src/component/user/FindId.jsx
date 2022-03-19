import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

import "../../css/user/signup.css"

function FindId() {
    const [email, setEmail] = useState("");
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


    const onPhoneNumberChanged = (event) => {
        setPhoneNumber(event.target.value);
    };

    useEffect(() => {
        if (password !== password2) {
            setPasswordCheck(false);
        } else {
            setPasswordCheck(true);
        }
    }, [password2]);

    useEffect(() => {
        let userEmailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (email && userEmailExp.test(email) === false) {
            setEmailCheck(false);
            setEmailDuplicateCheck(false);
        } else {
            setEmailCheck(true);
        }
    }, [email]);

    useEffect(() => {
    }, [address]);


    const onUsernameChange = (event) => {
        setUserName(event.target.value);
    };


    /*휴대폰 인증 */
    const getCertification = () => {
        const data = {
            phoneNumber: phonenumber,
            passwordSearch: true
        }
        axios.post("/auth/getVerificationCode", data).then((result) => {
            alert(result.data.message);
        }).catch((error) => {
            console.log(error);
        })
    };

    /*휴대폰 인증번호 확인 */
    const onCertificationNumberChanged = (event) => {
        const data = {
            phoneNumber: phonenumber,
            checkVerificationCode: event.target.value
        }
        axios.post("/auth/checkVerificationCode", data).then((result) => {
            if (result.data.message === "success") {
                setLabelCheck(true);
            } else {
                setLabelCheck(false);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    //회원가입 클릭시
    const signup = () => {
        
        if (!username) {
            alert("이름을 입력해주세요");
            return;
        }
        if (!labelCheck) {
            alert("휴대폰 인증을 받아주세요");
            return;
        }

        const data = {
            username: username,
            phoneNumber: phonenumber,
        };
        axios.post("/auth/findEmail", data)
            .then((result) => {
                console.log(result);
                alert(result.data.message);
                navigate('/login');
            }).catch((error) => {
                alert(error.response.data.message);
            })
    }
    return (
        <>
            <section className="signup">
                <div className="signup__title">
                    <h2 className="signup__title__h2">아이디 찾기</h2>
                    <h2 className="signup__title__h2">|</h2>
                    <h2 className="signup__title__h2">비밀번호 찾기</h2>
                </div>
                <small className="signup__title__span"><span className="signup__necessary">*</span>필수 입력 사항</small>
                <div className="signup__hr" />
                <section className="signup__form">

                    <div className="signup__form__name">
                        <label>이름<span className="signup__necessary">*</span></label>
                        <input type="text" onChange={onUsernameChange}></input>
                    </div>
                    <div className="signup__form__phone">
                        <label>휴대폰<span className="signup__necessary">*</span></label>
                        <input type="text" onChange={onPhoneNumberChanged} disabled={labelCheck ? true : false}></input>
                        <button onClick={getCertification}>인증번호받기</button>
                    </div>
                    <div className="signup__form__certification">
                        <label>인증확인<span className="signup__necessary">*</span></label>
                        <input type="text" onChange={onCertificationNumberChanged} disabled={labelCheck ? true : false} />
                    </div>
                    {labelCheck === true ? <ul className="signup__form__emailCheck"><ol></ol><li><small className="signup__form__email__small">✅ 인증되었습니다</small></li></ul> : ""}

                    <div className="signup__form__registDiv">
                        <button className="register__btn" onClick={signup}>아이디 찾기</button>
                    </div>
                </section>
            </section>
        </>
    )
}
export default FindId;