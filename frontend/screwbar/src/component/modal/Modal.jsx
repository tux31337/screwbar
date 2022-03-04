import React from 'react';
import '../../css/modal/teamModal.css';
import Parser from 'html-react-parser';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, detail } = props;
  // let detailContents = detail != undefined ? detail.contents : "";
  // console.log(detailContents);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {detail.title}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
              <span><img src={detail.postImg} alt=""/></span>
              <span>{detail.title}</span>
              {Parser(detail.contents)}
            </main>
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

export default Modal;