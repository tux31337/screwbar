import axios from "axios";
import { useEffect, useState } from "react";
import "../css/home.css"
import Modal from "./modal/Modal"

function Home() {
    const [myInfo, setMyInfo] = useState({});	//내 정보
    const [teams, setTeams] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
      const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        axios.get("/team/getTeam").then((result) => {
            setTeams(result.data.message);
        });
    }, []);

    useEffect(() => {
        axios.get("/auth/myInfo").then((result) => {
            setMyInfo(result.data.message);
        });
    }, []);



    return(
        
        <>
        
            <article className="home">
                <section className="home__cards">
                    {teams && teams.map((team) => {
                        {console.log(team)}
                        return (
                            <div key={team.postNum} onClick={openModal}>
                                <img src={team.postImg} alt="" className="home__cards__img" />
                                <span>{team.title}</span>
                                <div className="home__cards__count">{team.headCount} / {team.participants}</div>
                                <div className="home__cards__hr"></div>
                            </div>
                        )
                    })}
                </section>
            </article>

            <Modal open={modalOpen} close={closeModal} header="Modal heading">
            
            </Modal>
        </>
    )
}

export default Home;