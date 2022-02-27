import React from 'react';
import '../../css/evaluation/modal.css';
import Evauation from './evaluation';

// 모달창
export default function ModalComponent({
  participant,
  modalVisibleId,
  setModalVisibleId,
}) {
  const onCloseHandler = () => {
    setModalVisibleId('');
  };

  return (
    <div
      className={
        modalVisibleId === participant.id ? 'openModal modal' : 'modal'
      }
    >
      <section>
        <header>
          🔥 {participant.name}님에게 열정주기 🔥
          <button className="close" onClick={onCloseHandler}>
            &times;
          </button>
        </header>
        <main>
          <Evauation onCloseHandler />
        </main>
        {/* <footer>
          <button className="close" onClick={onCloseHandler}>
            제출하기
          </button>
        </footer> */}
      </section>
    </div>
  );
}
/* 
import React from 'react';
import '../../css/evaluation/modal.css';
const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal; */
