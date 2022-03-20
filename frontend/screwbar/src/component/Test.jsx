import { Navigate, useNavigate } from 'react-router-dom';
import '../css/Test.css';

const Test = () => {
    const navigate = useNavigate();


    setTimeout(() => {
        console.log("test")
        navigate("/home");
    }, 18000)

    return (
        <div className='iframe'>
            <video controls width="100%" className='iframe__video' autoPlay muted="unmuted">
                <source src="img/screwbar.mp4"
                    type="video/mp4" />
            </video>
            <audio autoPlay controls>
                <source src='img/screwbar.mp3' type='audio/mp3'/>
            </audio>
        </div>
    )
}

export default Test;