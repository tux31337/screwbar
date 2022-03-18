/* eslint-disable */

import axios from 'axios';
import '../css/navbar.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState({}); //내 정보
  const [checkStatus, setCheckStatus] = useState(false);
  useEffect(() => {
    axios
      .get('/auth/myInfo')
      .then((result) => {
        setMyInfo(result.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  function logout() {
    axios.get('/auth/logout').then(() => {
      navigate('/login');
    });
  }

  const openCategory = () => {
    setCheckStatus(!checkStatus);
  };

  const goHome = () => {
    navigate('/home');
  };

  const postBtn = () => {
    navigate('/post');
  };

  const chatBtn = () => {
    navigate('/chat');
  };

  const goMypage = () => {
    navigate('/myTeam');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__header">
          {myInfo && myInfo.userId == undefined ? (
            <ul>
              <li>
                <a href="/signup">회원가입</a>
              </li>
              <li>
                <a href="/login">로그인</a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <img
                  className="logoutBtn"
                  src="img/user.svg"
                  onClick={goMypage}
                />
              </li>
              <li>
                <img
                  className="logoutBtn"
                  src="img/logout.svg"
                  onClick={logout}
                />
              </li>
            </ul>
          )}
        </div>
        <div className="navbar__logo">
          <img
            src="img/logo.png"
            className="navbar__logo__img"
            onClick={goHome}
          ></img>
        </div>
        <div className="navbar__bottom">
          <div className="naver_bottom_nav">
            <input type="checkbox" id="menuicon" defaultChecked={checkStatus} />

            <label htmlFor="menuicon" onClick={openCategory}>
              <span></span>
              <span></span>
              <span></span>
            </label>
            <h4 onClick={openCategory}>&nbsp;&nbsp;랭킹</h4>
            <div className="sidebar">
              <div>축구</div>
              <div>야구</div>
              <div>농구</div>
              <div>탁구</div>
              <div>배구</div>
              <div>배드민턴</div>
              <div>테니스</div>
              <div>골프</div>
              <div>볼링</div>
              <div>러닝</div>
              <div>클라이밍</div>
              <div>사이클</div>
              <div>PT</div>
              <div>필라테스</div>
              <div>요가</div>
              <div>등산</div>
              <div>기타</div>
            </div>
          </div>
          <ul className="navbar__bottom__menu1"></ul>
          <div className="navbar__bottom__menu2">
            <img
              src="img/board.svg"
              className="navbar__bottom__menu2__board"
              onClick={postBtn}
            />
            <img
              src="img/chat.svg"
              className="navbar__bottom__menu2__chat"
              onClick={chatBtn}
            />
          </div>
          <div></div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
