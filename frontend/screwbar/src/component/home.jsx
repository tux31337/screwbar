import axios from 'axios';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import '../css/home.css';
import Modal from './modal/Modal';

let detailTeam;
function Home() {
  const [myInfo, setMyInfo] = useState({}); //내 정보
  const [teams, setTeams] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  let detail = useRef();

  const openModal = (postNumId) => {
    detailTeam = teams.filter((team) => team.postNum === postNumId);
    detailTeam = detailTeam[0];
    setModalOpen(true);
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

      <Modal
        open={modalOpen}
        close={closeModal}
        header="Modal heading"
        detail={detailTeam}
      >
        <div>{console.log(detailTeam)}</div>
      </Modal>
    </>
  );
}

export default Home;
