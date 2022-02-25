import { useState } from "react";
import QuillEditor from "./QuillEditor";

function CreateTeam() {
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
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
    return (
        <>
            <input type="file" id="file" onChange={handleChangeFile} multiple="multiple" />
            {imgBase64.map((item, i) => {
        return(
            <img key={i}
            className="d-block w-100"
            src={item}
            alt="First slide"
            style={{width:"300px",height:"300px"}}
            />
        )
        }) }
            <QuillEditor imgFile={imgFile}/>
        </>
    )

}
export default CreateTeam;