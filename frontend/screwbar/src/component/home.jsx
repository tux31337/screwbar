import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/home.css';
import TeamModal from './team/TeamModal';

let detailTeam;
let isParticipant;
function Home() {
  const [myInfo, setMyInfo] = useState({}); //내 정보
  const [teams, setTeams] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (postNumId) => {
    console.log('open modal' + postNumId);

    axios
      .post('/team/isParticipant', { postNumId: postNumId })
      .then((result) => {
        isParticipant = result.data;
        detailTeam = teams.filter((team) => team.postNum === postNumId);
        detailTeam = detailTeam[0];
        setModalOpen(true);
      });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    axios.get('/team/getTeam').then((result) => {
      setTeams(result.data.message);
    });
  }, []);

  useEffect(() => {
    axios.get('/auth/myInfo').then((result) => {
      setMyInfo(result.data.message);
    });
  }, []);

  return (
    <>
      <article className="home">
        <section className="home__cards">
          {teams &&
            teams.map((team) => {
              {
                console.log(team.postNum);
              }
              return (
                <div
                  key={team.postNum}
                  onClick={() => {
                    openModal(team.postNum);
                  }}
                >
                  <img src={team.postImg} alt="" className="home__cards__img" />
                  <span>{team.title}</span>
                  <div className="home__cards__count">
                    {team.headCount} / {team.participants}
                  </div>
                  <div className="home__cards__hr"></div>
                </div>
              );
            })}
        </section>
      </article>

      <TeamModal
        open={modalOpen}
        close={closeModal}
        header="Modal heading"
        detail={detailTeam}
        isParticipant={isParticipant}
      >
        <div>{console.log(detailTeam)}</div>
      </TeamModal>
    </>
  );
}

export default Home;
