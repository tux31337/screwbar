import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../css/team/myTeam.css';
import TeamModal from '../team/TeamModal';
import Temperature from '../mypage/temperature';

let detailTeam;
let isParticipant;
let myData;

const MyTeam = (props) => {
  const [myInfo, setMyInfo] = useState({}); //내 정보
  const [teams, setTeams] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (postNumId) => {
    // console.log('open modal' + postNumId);

    axios
      .post('/team/isParticipant', { postNumId: postNumId })
      .then((result) => {
        axios.get('/auth/myInfo').then((userInfo) => {
          isParticipant = result.data;
          detailTeam = teams.filter((team) => team.postNum === postNumId);
          detailTeam = detailTeam[0];
          myData = userInfo;
          setModalOpen(true);
        });
      });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    axios.get('/team/getMyTeam').then((result) => {
      setTeams(result.data.message);
    });
  }, []);

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    await axios.get('/auth/myInfo').then((result) => {
      setMyInfo(result.data);
    });
  };

  return (
    <>
      {/* {console.log(myInfo)} */}
      <Temperature myInfo={myInfo}></Temperature>

      {myInfo && (
        <article className="home">
          <h4 className="classification">대기 중인 나의 팀</h4>
          <section className="home__cards">
            {teams &&
              teams.map((team) => {
                /*               {
                console.log(team.closed);
              } */
                return (
                  <>
                    {team.closed === 0 && (
                      <div
                        key={team.postNum}
                        onClick={() => {
                          openModal(team.postNum);
                        }}
                      >
                        <div>
                          <img
                            src={team.postImg}
                            alt=""
                            className="home__cards__img"
                          />
                          <span>{team.title}</span>
                          <div className="home__cards__count">
                            {team.headCount} / {team.participants}
                          </div>
                        </div>
                        <div className="home__cards__hr"></div>
                      </div>
                    )}
                  </>
                );
              })}
          </section>
          <div className="partition"></div>
          <h4 className="classification">마감된 나의 팀</h4>
          <section className="home__cards">
            {teams &&
              teams.map((team) => {
                /*               {
                console.log(team.closed);
              } */
                return (
                  <>
                    {team.closed !== 0 && (
                      <div
                        key={team.postNum}
                        onClick={() => {
                          openModal(team.postNum);
                        }}
                      >
                        <div className="closedTeam">
                          <p className="closedText">마감</p>
                        </div>
                        <img
                          src={team.postImg}
                          alt=""
                          className="home__cards__img"
                        />
                        <span>{team.title}</span>
                        <div className="home__cards__count">
                          {team.headCount} / {team.participants}
                        </div>
                        <div className="home__cards__hr"></div>
                      </div>
                    )}
                  </>
                );
              })}
          </section>
        </article>
      )}
      <TeamModal
        open={modalOpen}
        close={closeModal}
        header="Modal heading"
        detail={detailTeam}
        isParticipant={isParticipant}
        myData={myData}
      ></TeamModal>
    </>
  );
};

export default MyTeam;
