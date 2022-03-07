import React, { useCallback, useEffect } from 'react';
import '../../css/modal/teamModal.css';
import Parser from 'html-react-parser';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, detail } = props;
  const [detailUser, setDetailUser] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const navigate = useNavigate();

  const convertTime = useCallback((time) => {
    return moment(time).format('YYYY/MM/DD');
  }, []);

  const showUserDetail = () => {
    setDetailUser(!detailUser);
  };

  const goToChat = (userId) => {
    navigate('/chat', {
      state: {
        userId: userId,
        username: detail.username,
      },
    });
  };

  console.log(detail);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal teamModal' : 'teamModal'}>
      {open ? (
        <section className="teamModal__section">
          <header>
            {detail.title}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main className="teamModal__main">
            <section className="teamModal__main__top">
              <div className="teamModal__main__top__left">
                <img src={detail.postImg} alt="" />
              </div>
              <div className="teamModal__main__top__right">
                <div className="teamModal__main__top__right__leader">
                  <span>이름 : {detail.username} </span>
                  <span>
                    나이 : {year - detail.birthday.substring(0, 4) + 1}
                  </span>
                  <span>성별 : {detail.gender}</span>
                  {detail.discloseInfo && (
                    <div className="teamModal__main__top__right__leader__imgSpan">
                      <img
                        src="/img/userDetail.svg"
                        alt=""
                        className="userDetail"
                        onMouseOver={showUserDetail}
                      />
                      <span className="teamModal__main__top__right__leader__detail">
                        <small>이메일 : {detail.email}</small>
                        <br />
                        <small>휴대폰 : {detail.phoneNumber}</small>
                      </span>
                    </div>
                  )}
                </div>
                <span className="teamModal__main__top__right__date">
                  모임 기간 : {convertTime(detail.meetingDate)}
                </span>
                <span className="teamModal__main__top__right__count">
                  모임 인원 : {detail.headCount} / {detail.participants}
                </span>
                <span className="teamModal__main__top__right__cost">
                  모임 비용 : {detail.cost}
                </span>
                <span className="teamModal__main__top__right__area">
                  모임 지역 : {detail.areaName}
                </span>
                <span className="teamModal__main__top__right__temparature">
                  열정온도 : {detail.temperature}
                </span>
                <span className="teamModal__main__top__right__btn">
                  <button className="teamModal__main__top__right__btn__join">
                    참가하기
                  </button>
                  <button
                    className="teamModal__main__top__right__btn__chatting"
                    onClick={() => goToChat(detail.user_id)}
                  >
                    문의하기
                  </button>
                </span>
              </div>
            </section>
            <section className="teamModal__main__bottom">
              <div className="teamModal__main__bottom__content">
                {Parser(detail.contents)}
              </div>
            </section>
          </main>
          <footer>
            <button className="close" id="modalClose" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
