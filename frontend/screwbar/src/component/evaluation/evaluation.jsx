import React, { useState } from 'react';
import Modal from './evaluationModal';
import '../../css/evaluation/evaluation.css';
import '../../css/font.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

//마감된 글 페이지
function Closed() {
  // 서버에서 가져오기
  const location = useLocation();

  let user_id;
  let postNum;

  if (location.state) {
    user_id = location.state.user_id;
    postNum = location.state.postNum;
  }
  const data = {
    postNum: postNum,
    user_id: user_id,
  };
  axios.post('/team/participants', data).then((result) => {
    console.log(result);
  });
  const participants = [
    { name: '이철수', id: 'qwer' },
    { name: '김영희', id: 'asdf' },
  ];

  const [modalVisibleId, setModalVisibleId] = useState(false);
  const [finalData, setfinalData] = useState([]);

  const onModalHandler = (id) => {
    setModalVisibleId(id);
  };

  // 서버로 보내기
  const finalSumbit = () => {
    console.log('서버로 보내자');
    console.log(finalData);
  };

  const onAdd = (finalPersonalData) => {
    console.log(finalPersonalData);
    const copyArray = [...finalData];
    copyArray.push(finalPersonalData.current);
    setfinalData(copyArray);
    console.log(finalData);
  };
  return (
    <div className="contents">
      <h4 className="contents__h4">참여자</h4>
      <ul className="participations">
        {participants.map((participant) => (
          <li key={participant.id}>
            <span className="participation_name">{participant.name}님</span>
            <button
              className="evaluation_btn"
              onClick={() => onModalHandler(participant.id)}
            >
              열정주기🔥
            </button>
            <Modal
              participant={participant}
              modalVisibleId={modalVisibleId}
              setModalVisibleId={setModalVisibleId}
              setfinalData={setfinalData}
              onAdd={onAdd}
            />
          </li>
        ))}
      </ul>
      <button className="finalSubmit-btn" onClick={() => finalSumbit()}>
        제출하기
      </button>
    </div>
  );
}

export default Closed;
