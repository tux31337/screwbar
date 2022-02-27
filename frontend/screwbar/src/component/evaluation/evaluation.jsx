import React, { useState } from 'react';
import '../../css/evaluation/evaluation.css';

//팀원 평가 컴포넌트
const Evauation = (props) => {
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

  const [selectedEvaluations, setEvaluations] = useState([]);

  const onClickHandler = (selectedItem) => {
    if (
      selectedEvaluations.find(
        (selectedEvaluation) => selectedEvaluation.id === selectedItem.id
      )
    ) {
      setEvaluations(
        selectedEvaluations.filter(
          (selectedEvaluation) => selectedEvaluation.id !== selectedItem.id
        )
      );
      return;
    }

    setEvaluations([...selectedEvaluations, selectedItem]);
    console.log(selectedEvaluations);
  };

  // 제출을 누르면 서버로 데이터 보내기 + 페이지 닫기
  const onSubmitEvaluations = () => {
    console.log('제출하기 버튼 클릭! 최종 데이터 👇');
    console.log(selectedEvaluations);
    //history.push('/evaluation');
  };

  return (
    <>
      <div className="App">
        <h3>좋아요</h3>
        <ul className="menu-group">
          {goods.map((good) => (
            <li
              className={
                selectedEvaluations.find(
                  (selectedEvaluation) => selectedEvaluation.id === good.id
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
                  (selectedEvaluation) => selectedEvaluation.id === bad.id
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
      <button className="submit-btn" onClick={onSubmitEvaluations}>
        제출하기
      </button>
    </>
  );
};

export default React.memo(Evauation);
