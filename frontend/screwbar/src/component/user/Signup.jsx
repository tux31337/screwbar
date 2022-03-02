import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

import { signupAction } from "../../action/auth";
import "../../css/user/signup.css"
import DaumPost from "./Daumpost";

function Signup() {
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
        if(password !== password2) {
            setPasswordCheck(false);
        } else {
            setPasswordCheck(true);
        }
    }, [password2]);

    const onBirthdayChange = (event) => {
        setBirthday(event.target.value);
    };
    
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    useEffect(() => {
        let userEmailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(email && userEmailExp.test(email) === false) {
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

    //이메일 중복체크
    const emailDuplicateChecking = () => {
        if(!emailCheck || email == "") {
            alert("이메일 형식으로 입력해주세요");
            return;
        }
        axios.get(`/auth/emailDuplicateCheck?email=${email}`).then((result) => {
            if(result.data.status) {
                alert(result.data.message);
                setEmailDuplicateCheck(true);
            } else {
                alert(result.data.message);
            }
        })

    }


    /*휴대폰 인증 */
    const getCertification = () => {
        const data = {
            phoneNumber: phonenumber
        }
        axios.post("/auth/getVerificationCode", data).then((result) => {
            alert(result.data.message);
        }).catch((error) => {
            console.log(error);
        })
    };

    /*휴대폰 인증번호 확인 */
    const onCertificationNumberChanged = (event) => {
        const  data = {
            phoneNumber: phonenumber,
            checkVerificationCode: event.target.value
        }
        axios.post("/auth/checkVerificationCode", data).then((result) => {
            if(result.data.message === "success") {
                setLabelCheck(true);
            } else {
                setLabelCheck(false);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 다음 주소 API 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 다음 주소 API 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    const changeRadio = (event) => {
        setRadioValue(event.target.value);
    }


    const onBirthdayYear = (event) => {
        let today = new Date();
        let year = today.getFullYear();
        if(event.target.value > year) {
            alert(`${year}년 보다 이전연도만 가능합니다`);
        }
        setBirthdayYear(event.target.value);
    }

    const onBirthdayMonth = (event) => {
        setBirthdayMonth(event.target.value);
    }

    const onBirthdayDate = (event) => {
        setBirthdayDate(event.target.value);
    }
    

    //회원가입 클릭시
    const  signup = () => {
        let finishAddress = address + addressDetail;
        setBirthday(birthdayYear+birthdayMonth+birthdayDate);
        if(!email || !emailCheck) {
            alert("이메일을 입력해주세요");
            return;
        }
        if(!emailDuplicateCheck) {
            alert("중복체크를 진행해주세요");
            return;
        }
        if(password === "") {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if(password2 === "") {
            alert("비밀번호를 한번 더 입력해주세요");
            return;
        }
        if(!passwordCheck) {
            alert("비밀번호가 같은지 확인해주세요");
            return;
        }
        if(!labelCheck) {
            alert("휴대폰 인증을 받아주세요");
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
            gender: radioValue,
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
            <div className="signup__title">
                <h2 className="signup__title__h2">회원가입</h2> 
            </div>
            <small className="signup__title__span"><span className="signup__necessary">*</span>필수 입력 사항</small>
            <div className="signup__hr" />
            <section className="signup__form">
                    <div className="signup__form__email">
                        <label>이메일<span className="signup__necessary">*</span></label>
                        <input type="text" onChange={onEmailChange} />
                        <button onClick={emailDuplicateChecking}>중복체크</button>
                    </div>
                    {emailCheck === false ? <ul className="signup__form__emailCheck"><ol></ol><li><small className="signup__form__email__small">❌ 이메일 형식으로 입력해주세요</small></li></ul> : null}
                    {emailDuplicateCheck === false ? <ul className="signup__form__emailCheck"><ol></ol><li><small className="signup__form__email__small">❌ 중복체크를 진행해주세요</small></li></ul> : null}

                    <div className="signup__form__password">
                        <label>비밀번호<span className="signup__necessary">*</span></label>
                        <input type="password" onChange={onPasswordChanged} />
                    </div>
                    <div className="signup__form__passwordConfrim">
                        <label>비밀번호확인<span className="signup__necessary">*</span></label>
                        <input type="password" onChange={onPasswordChanged2}></input>
                    </div>
                    {passwordCheck === false ? <ul className="signup__form__emailCheck"><ol></ol><small className="signup__small">❌ 비밀번호가 일치하지 않습니다.</small></ul> : null}
                    {
                        isPopupOpen && <DaumPost address={address} setAddress={setAddress} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}></DaumPost>
                    }
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
                    <div className="signup__form__address">
                        <label>주소<span className="signup__necessary">*</span></label>
                        {
                            !address && <button className="signup__form__address__btn" onClick={openPostCode}><img src="img/search.svg" className="signup__form__img"/>주소 검색</button>
                        }
                        {
                            address &&  <input type="text" className="signup__address" maxLength={25} defaultValue={address} onChange={onAddressChanged}/> 
                        }
                    </div>
                        {
                            address && <div className="signup__form__address2"><label></label><input type="text" className="signup__address" maxLength={25} onChange={onAddressDetail} placeholder="상세 주소를 입력해주세요"/> </div>
                        }
                        <div className="signup__form__birthDay">
                            <label>생년월일<span className="signup__necessary">*</span></label>
                            <div>
                                <span>
                                    <input type="text" placeholder="YYYY" maxLength={4} onChange={onBirthdayYear} />/
                                </span>
                                <span>                                    
                                    <input type="text" placeholder="MM" maxLength={2} onChange={onBirthdayMonth}/>/
                                </span>
                                <span>                                    
                                    <input type="text" placeholder="DD" maxLength={2} onChange={onBirthdayDate} />
                                </span>
                            </div>
                        </div>
                        <div className="signup__form__gender">
                            <label>성별<span className="signup__necessary">*</span></label>
                            <span>
                                <input type="radio" value="남" onChange={changeRadio} checked={radioValue === "남" ? true : false} />남
                                <input type="radio" value="여" onChange={changeRadio} checked={radioValue === "여" ? true : false}/>여
                            </span>
                        </div>
                        <div className="signup__form__registDiv">
                            <button className="register__btn" onClick={signup}>가입하기</button>
                        </div>

            </section>
        </section>
    </>
    )
}
export default Signup;