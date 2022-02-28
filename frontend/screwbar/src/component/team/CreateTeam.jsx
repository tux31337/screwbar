import { useRef, useState } from "react";
import QuillEditor from "./QuillEditor";
import "../../css/team/createTeam.css"
import { useEffect } from "react";
import axios from "axios";

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
    const [deleteUrl, setDeleteUrl] = useState([]);

    useEffect(() => {
        axios.get("/auth/myInfo").then((result) => {
            setMyInfo(result.data);
        })
    }, []);

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
        formData.append('personnel', personnel);
        formData.append('price', price);
        formData.append('excercise', excercise);
        formData.append('date', date);
        formData.append('temperature', temperature);
        formData.append('content', props.quill.root.innerHTML);
        formData.append('title', props.title);
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
                            style={{width:"500px",height:"350px"}}
                            />
                        )
                        }) }
                        </div>
                    </div>
                    <input type="file" className="createTeam__upload" onChange={handleChangeFile} multiple="multiple" />
                </section>
                <section className="createTeam__information">
                    <span className="createTeam__information__text">인원 : <input type="text" className="createTeam__information__input" onChange={personnelChange}></input> 명</span>
                    <span className="createTeam__information__text">리더 : {myInfo.userName}님, 남, {myInfo.age}</span>
                    <span className="createTeam__information__text">비용 : <input type="text" className="createTeam__information__input" value={price} onChange={(event) => setPrice(priceFormatChange(event.target.value))}></input></span>
                    <span className="createTeam__information__text">날짜 : <input type="text" className="createTeam__information__input" onChange={dateChange} /></span>
                    <span className="createTeam__information__text">운동종류 :
                    <select onChange={excerciseTypeChange}>
                        <option value="">운동 종류</option>
                        <option value="축구">축구</option>
                        <option value="농구">농구</option>
                        <option value="야구">야구</option>
                    </select>
                    </span>
                    <span className="createTeam__information__text">열정온도 조건 :
                    <select onChange={temperatureChange}>
                        <option value="">열정온도</option>
                        <option value="35">35</option>
                        <option value="30">30</option>
                        <option value="25">25</option>
                        <option value="상관 없음">상관 없음</option>
                    </select>
                    </span>
                    <button onClick={postTeamPosting} className="postBtn">글작성</button>
                </section>
            </article>
        </>
    )

}
export default CreateTeam;