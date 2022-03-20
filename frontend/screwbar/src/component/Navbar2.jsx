/* eslint-disable */

import axios from 'axios';
import '../css/navbar2.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar2() {
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
                  src="img/user.png"
                  onClick={goMypage}
                />
              </li>
              <li>
                <img
                  className="logoutBtn"
                  src="img/logout2.png"
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
        
      </nav>
    </>
  );
}

export default Navbar2;
