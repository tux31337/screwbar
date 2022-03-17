import '../../css/user/login.css';
import { loginAction } from '../../action/auth.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../action/auth.js';

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const onPhoneNumberChanged = (event) => {
    setPhoneNumber(event.target.value);
    console.log(phoneNumber);
  };
  const onPasswordChanged = (event) => {
    console.log(password);
    setPassword(event.target.value);
  };

  const userLogin = () => {
    let data = {
      email: phoneNumber,
      password: password,
    };
    dispatch(loginUser(data)).then((response) => {
      if (response.payload.token) {
        navigate('/home');
      } else {
        alert(response.payload.response.data.message);
      }
    });
  };

  const userLogout = () => {};

  return (
    <>
      <section className="login">
        <div>
          <img src="img/screwbar.png"></img>
        </div>
        <label className="login__label">이메일</label>
        <input
          type="text"
          className="login__phone"
          onChange={onPhoneNumberChanged}
        />
        <label className="login__label">비밀번호</label>
        <input
          type="password"
          id="login__password"
          className="login__password"
          onChange={onPasswordChanged}
        />

        <button className="login__loginBtn" onClick={userLogin}>
          로그인
        </button>
        <button
          className="login__signupBtn"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
        <ul className="login__finddiv">
          <li className="login__finddiv__list">
            <a>아이디 찾기</a>
          </li>
          <li className="login__finddiv__list">
            <a>비밀번호 찾기</a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Login;
