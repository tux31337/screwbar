import React, { useState } from 'react';
import Modal from './evaluationModal';
import '../../css/evaluation/evaluation.css';
import '../../css/font.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//마감된 글 페이지
function Closed() {
  // 서버에서 가져오기
  const location = useLocation();
  const [teamParticipants, setTeamParticipants] = useState([]);
  const navigate = useNavigate();

  let user_id;
  let postNum;

  if (location.state) {
    user_id = location.state.user_id;
    postNum = location.state.postNum;
  }
  const data = {
    postNum: postNum,
  };
  useEffect(() => {
    axios.post('/team/getParticipants', data).then((result) => {
      // console.log(result);
      setTeamParticipants(result.data.result);
    });
  }, []);

  const [modalVisibleId, setModalVisibleId] = useState(false);
  const [finalData, setfinalData] = useState([]);

  const onModalHandler = (evaluated_user_id) => {
    if (evaluated_user_id === user_id) {
      alert('자신에겐 열정을 주실 수 없습니다.😿');
    } else {
      setModalVisibleId(evaluated_user_id);
    }
  };

  // 서버로 보내기
  const finalSumbit = () => {
    /*     console.log('서버로 보내자');
    console.log(finalData); */

    const data = {
      user_id: user_id,
      postNum: postNum,
      finalData: finalData,
    };

    axios.post('/team/evaluation', data).then((result) => {
      alert(result.data.message);
      navigate('/myTeam');
    });
  };

  const onAdd = (finalPersonalData) => {
    // console.log(finalPersonalData);
    const copyArray = [...finalData];

    // id가 중복인지 확인하고 중복이면 이전 것을 삭제하고 현재 들어온 값을 저장해주기
    const newArray =
      copyArray &&
      copyArray.filter(
        (participantEval) =>
          participantEval.user_id !== finalPersonalData.current.user_id
      );
    finalPersonalData && newArray.push(finalPersonalData.current);
    // console.log(newArray);
    setfinalData(newArray);
    // console.log(finalData);
  };
  return (
    <div className="contents">
      <h4 className="contents__h4">참여자</h4>
      {/* {console.log(teamParticipants)} */}
      <ul className="participations">
        {teamParticipants &&
          teamParticipants.map((participant) => (
            <li key={participant.user_id}>
              <span className="participation_name">
                {participant.username}님
              </span>
              <button
                className="evaluation_btn"
                onClick={() => onModalHandler(participant.user_id)}
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
