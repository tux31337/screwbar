/* eslint-disable */

import axios from 'axios';
import '../css/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState({}); //내 정보
  const [checkStatus, setCheckStatus] = useState(false);
  const [tab, setTab] = useState('curr');
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
    navigate('/chatting');
  };

  const goMypage = () => {
    navigate('/myTeam');
  };

  const areaValueChange = (event) => {
    navigate('/home', {
      state: {
        area: event.target.value,
      },
    });
  }

  const changeTab = (value) => {
    setTab(value);
    setCheckStatus(false);
  }

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
        <div className="navbar__logo" onClick={() => changeTab("전체")}>
          <Link to= "/home" state={{data: "전체"}}>
            <img
              src="img/logo.png"
              className="navbar__logo__img"
              onClick={goHome}
            ></img>
          </Link>
        </div>
        <div className="navbar__bottom">
          <div className="naver_bottom_nav">
            <input type="checkbox" id="menuicon" checked={checkStatus} onChange={openCategory}/>
            <label onClick={openCategory}>
              <span></span>
              <span></span>
              <span></span>
            </label>
            <h4 onClick={openCategory}>&nbsp;&nbsp;랭킹</h4>
            <div className="sidebar">
            <div className={tab === '전체' ? 'active' : ''} onClick={() => changeTab("전체")}><Link to= "/home" state={{data: "전체"}}>전체</Link></div>
              <div className={tab === '축구' ? 'active' : ''} onClick={() => changeTab("축구")}><Link to= "/home" state={{data: "축구"}}>축구</Link></div>
              <div  className={tab === '야구' ? 'active' : ''} onClick={() => changeTab("야구")}><Link to= "/home" state={{data: "야구"}}>야구</Link></div>
              <div className={tab === '농구' ? 'active' : ''} onClick={() => changeTab("농구")}><Link to= "/home" state={{data: "농구"}}>농구</Link></div>
              <div className={tab === '탁구' ? 'active' : ''} onClick={() => changeTab("탁구")}><Link to= "/home" state={{data: "탁구"}}>탁구</Link></div>
              <div className={tab === '배구' ? 'active' : ''} onClick={() => changeTab("배구")}><Link to= "/home" state={{data: "배구"}}>배구</Link></div>
              <div className={tab === '배드민턴' ? 'active' : ''} onClick={() => changeTab("배드민턴")}><Link to= "/home" state={{data: "배드민턴"}}>배드민턴</Link></div>
              <div className={tab === '테니스' ? 'active' : ''} onClick={() => changeTab("테니스")}><Link to= "/home" state={{data: "테니스"}}>테니스</Link></div>
              <div className={tab === '골프' ? 'active' : ''} onClick={() => changeTab("골프")} ><Link to= "/home" state={{data: "골프"}}>골프</Link></div>
              <div className={tab === '볼링' ? 'active' : ''} onClick={() => changeTab("볼링")}><Link to= "/home" state={{data: "볼링"}}>볼링</Link></div>
              <div className={tab === '러닝' ? 'active' : ''} onClick={() => changeTab("러닝")}><Link to= "/home" state={{data: "러닝"}}>러닝</Link></div>
              <div className={tab === '클라이밍' ? 'active' : ''} onClick={() => changeTab("클라이밍")}><Link to= "/home" state={{data: "클라이밍"}}>클라이밍</Link></div>
              <div className={tab === '사이클' ? 'active' : ''} onClick={() => changeTab("사이클")}><Link to= "/home" state={{data: "사이클"}}>사이클</Link></div>
              <div className={tab === 'PT' ? 'active' : ''} onClick={() => changeTab("PT")}><Link to= "/home" state={{data: "PT"}}>PT</Link></div>
              <div className={tab === '필라테스' ? 'active' : ''} onClick={() => changeTab("필라테스")}><Link to= "/home" state={{data: "필라테스"}}>필라테스</Link></div>
              <div className={tab === '요가' ? 'active' : ''} onClick={() => changeTab("요가")}><Link to= "/home" state={{data: "요가"}}>요가</Link></div>
              <div className={tab === '등산' ? 'active' : ''} onClick={() => changeTab("등산")}><Link to= "/home" state={{data: "등산"}}>등산</Link></div>
              <div className={tab === '기타' ? 'active' : ''} onClick={() => changeTab("기타")}><Link to= "/home" state={{data: "기타"}}>기타</Link></div>
            </div>
          </div>
          <ul className="navbar__bottom__menu1"></ul>
          <div className="navbar__bottom__menu2">
          <select className="createTeam__information__area__value" onChange={areaValueChange}>
                <option key="지역선택">지역선택(전체)</option>
                <option key="성북구">성북구</option>
                <option key="은평구">은평구</option>
                <option key="서대문구">서대문구</option>
                <option key="노원구">노원구</option>
                <option key="강북구">강북구</option>
                <option key="도봉구">도봉구</option>
                <option key="동대문구">동대문구</option>
                <option key="중랑구">중랑구</option>
                <option key="성동구">성동구</option>
                <option key="광진구">광진구</option>
                <option key="종로구">종로구</option>
                <option key="중구">중구</option>
                <option key="용산구 ">용산구 </option>
                <option key="양천구">양천구</option>
                <option key="강서구">강서구</option>
                <option key="영등포구">영등포구</option>
                <option key="구로구">구로구</option>
                <option key="금천구">금천구</option>
                <option key="관악구">관악구</option>
                <option key="동작구">동작구</option>
                <option key="강남구">강남구</option>
                <option key="서초구">서초구</option>
                <option key="강동구">강동구</option>
                <option key="송파구">송파구</option>
            </select>
            <img
              src="img/write.png"
              className="navbar__bottom__menu2__board"
              onClick={postBtn}
            />
            <img
              src="img/email.png"
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
