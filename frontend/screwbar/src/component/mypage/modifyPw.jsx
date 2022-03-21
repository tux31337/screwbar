import axios from "axios";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import "../../css/mypage/modify.css"
import DaumPost from "../user/Daumpost";
import React from 'react';


const ModifyPw = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const [passwordCheck, setPasswordCheck] = useState(true);
    const navigate = useNavigate();

    const onPasswordChanged = (event) => {
        setPassword(event.target.value);
    };

    const onPasswordChanged2 = (event) => {
        setPassword2(event.target.value);
    };

    const onAddressChanged = (event) => {
        setAddress(event.target.value);
    };

    const onAddressDetail = (event) => {
        setAddressDetail(event.target.value);
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

    useEffect(() => {
        if (password !== password2) {
            setPasswordCheck(false);
        } else {
            setPasswordCheck(true);
        }
    }, [password2]);


    useEffect(() => {
    }, [address]);

//주소 변경 클릭시
const changeAddress = () => {
    const data = {
        address: address + "," + addressDetail
    }

    axios.post("/auth/newAddress", data)
        .then((result) => {
            console.log(result);
            alert("주소가 변경되었습니다.");
            navigate("/myTeam");
        }).catch((error) => {
            alert(error.response.data.message);
        })
}


    //비밀번호 변경 클릭시
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

        const data = {
            password: password
        }

        function logout() {
            axios.get('/auth/logout').then(() => {
                navigate('/login');
            });
        }

        axios.post("/auth/newPassword", data)
            .then((result) => {
                console.log(result);
                alert("비밀번호가 변경되었습니다.");
                logout();
            }).catch((error) => {
                alert(error.response.data.message);
            })
    }
    return (
        <>
            <section className="signup">
                <div className="signup__title">
                    <h2 className="signup__title__h2">주소 변경</h2>
                </div>
                <small className="signup__title__span"><span className="signup__necessary">*</span>필수 입력 사항</small>
                <div className="signup__hr" />
                <section className="signup__form">
                {
                        isPopupOpen && <DaumPost address={address} setAddress={setAddress} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}></DaumPost>
                    }
                    <div className="signup__form__address">
                        <label>주소<span className="signup__necessary">*</span></label>
                        {
                            !address && <button className="signup__form__address__btn" onClick={openPostCode}><img src="img/search.svg" className="signup__form__img" />주소 검색</button>
                        }
                        {
                            address && <input type="text" className="signup__address" maxLength={25} defaultValue={address} onChange={onAddressChanged} />
                        }
                    </div>
                    {
                        address && <div className="signup__form__address2"><label></label><input type="text" className="signup__address" maxLength={25} onChange={onAddressDetail} placeholder="상세 주소를 입력해주세요" /> </div>
                    }
                    <div className="signup__form__registDiv">
                        <button className="register__btn" onClick={changeAddress}>주소 변경</button>
                    </div>
                    <div className="signup__title2">
                        <h2 className="signup__title__h2">비밀번호 변경</h2>
                    </div>
                    <div className="signup__hr" />
                    <div className="signup__form__password">
                        <label>비밀번호<span className="signup__necessary">*</span></label>
                        <input type="password" onChange={onPasswordChanged} />
                    </div>
                    <div className="signup__form__passwordConfrim">
                        <label>비밀번호 확인<span className="signup__necessary">*</span></label>
                        <input type="password" onChange={onPasswordChanged2}></input>
                    </div>
                    {passwordCheck === false ? <ul className="signup__form__emailCheck"><ol></ol><small className="signup__small">❌ 비밀번호가 일치하지 않습니다.</small></ul> : null}
                    <div className="signup__form__registDiv">
                        <button className="register__btn" onClick={changePw}>비밀번호 변경</button>
                    </div>
                </section>
            </section>
        </>
    )
}
export default ModifyPw;