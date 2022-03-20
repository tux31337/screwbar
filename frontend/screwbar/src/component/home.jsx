import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/home.css';
import TeamModal from './team/TeamModal';

let detailTeam;
let isParticipant;
let myData;
let sport;
let area;

function Home() {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // 로딩 중인지 아닌지 담기
  const [fetching, setFetching] = useState(false);
  const [teamPaing, setTeamPaging] = useState(0);
  const [myInfo, setMyInfo] = useState({}); //내 정보
  const [teams, setTeams] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0); // 총 로딩가능한 페이지수
  const [sports, setSprots] = useState();
  const [areas, setAreas] = useState();

  if(location.state){
    if(location.state.data === "전체") {
      sport = "";
    }
    else if(location.state.data) {
      sport = location.state.data;
      console.log(sport)
    }
    if(location.state.area === "지역선택(전체)") {
      area = "";
    }
    else if(location.state.area) {
      area = location.state.area;
    }
  }
  const openModal = (postNumId) => {
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
    setSprots(sport);
    setTeamPaging(0);
  }, [sport]);

  useEffect(() => {
    setAreas(area);
    setTeamPaging(0);
  }, [area]);

  useEffect(() => {
    axios.get('/team/teamCount').then((result) => {
      setPage(result.data.page);
    })
  }, [])

  useEffect(() => {
    axios.get('/auth/myInfo').then((result) => {
      setMyInfo(result.data.message);
    });
  }, []);


  //scroll loading 
  const fetchTeams = async () => {
    console.log(sports);
    console.log(area);

    setLoading(true);
    if(page >= teamPaing) {
      if(sports && !area) {
        console.log("1실행")
        await axios.get(`/team/getTeam?page=${teamPaing}&&sport=${sport}`).then((result) => {
          setTeams(result.data.message);
          setTeamPaging(result.data.paging); // 다음페이지 불러오기
        })
      } else if(!sports && area) {
        console.log("2실행")
        await axios.get(`/team/getTeam?page=${teamPaing}&&area=${area}`).then((result) => {
          setTeams(result.data.message);
          setTeamPaging(result.data.paging);
        })
      } else if(area && sports) { 
        console.log("3실행")
          await axios.get(`/team/getTeam?page=${teamPaing}&&area=${area}&&sport=${sport}`).then((result) => {
            setTeams(result.data.message);
            setTeamPaging(result.data.paging);
          })
      } else {
        console.log("4실행")
        await axios.get('/team/getTeam?page='+teamPaing).then((result) => {
          setTeams(result.data.message);
          setTeamPaging(result.data.paging) // 다음페이지 불러오기
        })
        .catch((error) => {
          console.log(error);
        })
        setLoading(false);
      }
  }
  }

  useEffect(() => {
    fetchTeams();
  }, [sports, areas]);

  const fetchMoreFetchTeams = async () => {
    setFetching(true);
    
    if(page >= teamPaing) {
      if(sports && !area) {
        console.log("-1실행-")
        await axios.get(`/team/getTeam?page=${teamPaing}&&sport=${sport}`).then((result) => {
          const fetchedData = result.data.message;
          const mergedData = teams.concat(...fetchedData);
          setTeams(mergedData);
          setTeamPaging(result.data.paging);
        });
      } else if(!sports && area) {
        console.log("-2실행-")
        await axios.get(`/team/getTeam?page=${teamPaing}&&area=${area}`).then((result) => {
          const fetchedData = result.data.message;
          const mergedData = teams.concat(...fetchedData);
          setTeams(result.data.message);
          setTeamPaging(result.data.paging);
        })
      } else if(area && sports) {
        console.log("-3실행-")
        await axios.get(`/team/getTeam?page=${teamPaing}&&area=${area}&&sport=${sport}`).then((result) => {
          const fetchedData = result.data.message;
          const mergedData = teams.concat(...fetchedData);
          setTeams(result.data.message);
          setTeamPaging(result.data.paging);
        })
      }else {
        console.log("-4실행-")
        await axios.get('/team/getTeam?page='+teamPaing).then((result) => {
        const fetchedData = result.data.message;
        const mergedData = teams.concat(...fetchedData);
        setTeams(mergedData);
        setTeamPaging(result.data.paging);
      })
    }
  }
    setFetching(false);
  }

  //스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + scrollHeight >= scrollHeight && fetching === false) {
      fetchMoreFetchTeams();
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  })

  return (
    <>
      <article className="home">
        <section className="home__cards">
          {teams &&
            teams.map((team, i) => {
              if (team.closed === 0) {
                return (
                  <div
                    key={i}
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
              }
            })}
        </section>
      </article>

      <TeamModal
        open={modalOpen}
        close={() => closeModal()}
        header="Modal heading"
        detail={detailTeam}
        isParticipant={isParticipant}
        myData = {myData}
      >
      </TeamModal>
    </>
  ) 
}

export default Home;
