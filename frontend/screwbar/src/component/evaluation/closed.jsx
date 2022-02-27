import React, { useState } from 'react';
import Modal from './modal.jsx';
import '../../css/evaluation/participants_list.css';

//마감된 글 페이지
function Closed() {
  // 서버에서 가져오기
  const participants = [
    { name: '이철수', id: 'qwer' },
    { name: '김영희', id: 'asdf' },
  ];

  const [modalVisibleId, setModalVisibleId] = useState(false);

  const onModalHandler = (id) => {
    setModalVisibleId(id);
  };
  return (
    <React.Fragment>
      <h4>참여자</h4>
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
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Closed;
