import React, { useRef, useState } from 'react';
import '../../css/evaluation/evaluationModal.css';
import '../../css/font.css';

// 모달창
const ModalComponent = ({
  participant,
  modalVisibleId,
  setModalVisibleId,
  onAdd,
}) => {
  // 모달창 열고닫고
  const onCloseHandler = () => {
    setModalVisibleId('');
  };

  const goods = [
    { id: 'goodkind', content: '친절해요 😃' },
    { id: 'goodtime', content: '시간 약속을 잘 지켜요 ⏰' },
    { id: 'goodmean', content: '다시 함께하고 싶어요 🤝' },
  ];
  const bads = [
    { id: 'badkind', content: '불친절해요 😤' },
    { id: 'badtime', content: '시간 약속을 안 지켜요 💤' },
    { id: 'badmean', content: '목적이 불순해요 🙅‍♀️' },
  ];

  // 어떤 것을 골랐는지
  const [selectedEvaluations, setEvaluations] = useState([]);
  //아이디 추가된
  let finalPersonalData = useRef({
    user_id: participant.user_id,
    goodkind: 0,
    goodtime: 0,
    goodmean: 0,
    badkind: 0,
    badtime: 0,
    badmean: 0,
  });

  //최종 개인데이터 만들기
  const onMakeData = (selectedEvaluations) => {
    // 초기화
    finalPersonalData.current['goodkind'] = 0;
    finalPersonalData.current['goodtime'] = 0;
    finalPersonalData.current['goodmean'] = 0;
    finalPersonalData.current['badkind'] = 0;
    finalPersonalData.current['badtime'] = 0;
    finalPersonalData.current['badmean'] = 0;

    for (let sel of selectedEvaluations) {
      finalPersonalData.current[sel] = 1;
    }
    return finalPersonalData;
  };
  // 항목을 클릭했을 때 이벤트
  const onClickHandler = (selectedItem) => {
    if (
      selectedEvaluations.find(
        (selectedEvaluation) => selectedEvaluation === selectedItem.id
      )
    ) {
      setEvaluations(
        selectedEvaluations.filter(
          (selectedEvaluation) => selectedEvaluation !== selectedItem.id
        )
      );
      return;
    }

    setEvaluations([...selectedEvaluations, selectedItem.id]);
  };

  // 제출을 누르면 evaluation으로 데이터 보내기 + 페이지 닫기
  const onSubmitPersonalData = () => {
    /*     console.log('확인 버튼 클릭! 선택된 데이터 👇');
    console.log(selectedEvaluations); */

    finalPersonalData = onMakeData(selectedEvaluations);
    /*     console.log('확인 버튼 클릭! finalPersonalData 데이터 👇');
    console.log(finalPersonalData); */
    onAdd(finalPersonalData);
    onCloseHandler();
  };

  return (
    <div
      className={
        modalVisibleId === participant.user_id ? 'openModal modal' : 'modal'
      }
    >
      {/* {console.log(participant)} */}
      <section>
        <header>
          <h2>🔥 {participant.username}님에게 열정주기 🔥</h2>
          <button className="close" onClick={onCloseHandler}>
            &times;
          </button>
        </header>
        <main>
          <div className="content">
            <h3>좋아요</h3>
            <ul className="menu-group">
              {goods.map((good) => (
                <li
                  className={
                    selectedEvaluations.find(
                      (selectedEvaluation) => selectedEvaluation === good.id
                    )
                      ? 'menu-item active'
                      : 'menu-item'
                  }
                  onClick={() => onClickHandler(good)}
                  key={good.id}
                >
                  {good.content}
                </li>
              ))}
            </ul>
            <h3>별로예요</h3>
            <ul className="menu-group">
              {bads.map((bad) => (
                <li
                  className={
                    selectedEvaluations.find(
                      (selectedEvaluation) => selectedEvaluation === bad.id
                    )
                      ? 'menu-item active'
                      : 'menu-item'
                  }
                  onClick={() => onClickHandler(bad)}
                  key={bad.id}
                >
                  {bad.content}
                </li>
              ))}
            </ul>
          </div>
          <button className="submit-btn" onClick={onSubmitPersonalData}>
            확인
          </button>
        </main>
      </section>
    </div>
  );
};

export default ModalComponent;
