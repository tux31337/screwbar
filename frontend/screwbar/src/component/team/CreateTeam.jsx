import { useRef, useState } from "react";
import QuillEditor from "./QuillEditor";
import "../../css/team/createTeam.css"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function CreateTeam(props) {
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//이미지 파일 setting
    const [myInfo, setMyInfo] = useState({});	//내 정보
    const [price, setPrice] = useState(0);
    const [personnel, setPersonnel] = useState(0);
    const [date, setDate] = useState("");
    const [excercise, setExcercise] = useState("");
    const [temperature, setTemperature] = useState("");
    const [useUrl, setUseUrl] = useState([]);
    const [title, setTitle] = useState([]);
    const [check, setCheck] = useState(false);


    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/auth/myInfo").then((result) => {
            setMyInfo(result.data);
        })
    }, []);

    const changeCheckValue = () => {
        setCheck(!check);
    }

    const priceFormatChange = (str) => {
        const comma = (str) => {
            str = String(str);
            str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
            return str;
          };
          const uncomma = (str) => {
            str = String(str);
            return str.replace(/[^\d]+/g, "");
          };
          return comma(uncomma(str));
    }

    const dateChange = (event) => {
        setDate(event.target.value);
    }

    const personnelChange = (event) => {
        setPersonnel(event.target.value);
    }

    const handleChangeFile = (event) =>{
        setImgFile(event.target.files);
        setImgBase64([]);
        for(let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result;
                    if(base64) {
                        let base64Sub = base64.toString();
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                    }
                }
            }
        }
    }

    const excerciseTypeChange = (event) => {
        setExcercise(event.target.value);
    }

    const onTitle = (event) => {
        setTitle(event.target.value);
    }

    const temperatureChange = (event) => {
        setTemperature(event.target.value);
    }


    const config = {
	    header: {'content-type': 'multipart/form-data'}
    }

    const postTeamPosting = () => {
        const formData = new FormData();
        if(imgFile) {
            formData.append('imgFile', imgFile[0]);
        }
        let discloseInfo = check === true ? 1 : 0;
        formData.append('personnel', personnel);
        formData.append('price', price);
        formData.append('excercise', excercise);
        formData.append('date', date);
        formData.append('temperature', temperature);
        formData.append('content', props.quill.root.innerHTML);
        formData.append('title', title);
        formData.append('discloseInfo', discloseInfo);
        props.quill.getContents().ops.map((result) => {
            if(result.insert.image) {
                const copyArray = useUrl;
                copyArray.push(result.insert.image);
                setUseUrl(copyArray)
            }
        });
        const deleteUrl = props.allUrl.current.filter(x => ! useUrl.includes(x));
        formData.append('deleteUrl', deleteUrl);
        axios.post("/team/createTeam", formData, config).then((result) => {
            alert(result.data.message);
            navigate('/home');
        }).catch((error) => {
            console.log(error);
        })
    }


/**
 * 
 */
    
    return (
        <>
        <article className="createTeam">
                <section className="createTeam__form">
                    <div>
                        <div className="createTeam__form__imgBox">
                        {imgBase64.map((item, i) => {
                        return(
                            <img key={i}
                            className="d-block w-100"
                            src={item}
                            alt="First slide"
                            style={{width:"250px",height:"250px"}}
                            />
                        )
                        }) }
                        </div>
                    </div>
                    <input type="file" className="createTeam__upload" onChange={handleChangeFile} multiple="multiple" />
                </section>
                <section className="createTeam__information">
                    <span className="createTeam__information__title">카테고리/모임명</span>
                    <span className="createTeam__information__excercise">
                        <select onChange={excerciseTypeChange} className="createTeam__information__excercise__selectbox">
                            <option value="">운동 종류</option>
                            <option value="축구">축구</option>
                            <option value="농구">농구</option>
                            <option value="야구">야구</option>
                        </select>
                    </span>
                    <input type="text" placeholder='제목을 입력하세요' className="createTeam__information__subjectTitle" onChange={onTitle} />
                    <span className="createTeam__information__information">정보</span>
                    <span className="createTeam__information__name">이름 : {myInfo.userName}</span>
                    <span className="createTeam__information__telephone">연락처 : {myInfo.phonenumber}</span>
                    <span className="createTeam__information__subInformation">부가 정보</span>
                    <span className="createTeam__information__open">공개 여부 : <input type="checkbox" defaultChecked={check} onClick={changeCheckValue}/></span>
                    <span className="createTeam__information__gender">성별 : {myInfo.gender}</span>
                    <span className="createTeam__information__email">이메일 : {myInfo.email}</span>  
                    <span className="createTeam__information__age">나이 : {myInfo.age}</span> 
                    <span className="createTeam__information__detail">팀 세부 조건</span>
                    <div className="createTeam__information__count">인원 : <input type="text" className="createTeam__information__count__input" onChange={personnelChange}></input></div>
                    <span className="createTeam__information__pay">비용 : <input type="text" className="createTeam__information__pay__input" value={price} onChange={(event) => setPrice(priceFormatChange(event.target.value))}></input></span>
                    <span className="createTeam__information__date">날짜 : <input type="date" className="createTeam__information__date__input" onChange={dateChange} /></span>

                    <span className="createTeam__information__temperature">열정온도 조건</span>
                    <select onChange={temperatureChange} className="createTeam__information__temperatureChange">
                        <option value="">열정온도</option>
                        <option value="35">35</option>
                        <option value="30">30</option>
                        <option value="25">25</option>
                        <option value="상관 없음">상관 없음</option>
                    </select>
                    <button onClick={postTeamPosting} className="createTeam__postBtn">글작성</button>
                </section>
            </article>
        </>
    )

}
export default CreateTeam;