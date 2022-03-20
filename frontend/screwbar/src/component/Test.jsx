
import { Navigate, useNavigate } from 'react-router-dom';
import '../css/Test.css';





 


const Test = () => {
    const navigate = useNavigate();

    
    setTimeout(() => {
        console.log("test")
        navigate("/home");
    }, 14000)
    
    return(
        <div className='iframe'>
            <video controls width="100%" className='iframe__video' autoPlay muted="muted">
                <source src="img/screwbar.mp4"
                    type="video/mp4" />
            </video>
        </div>
    )
}

export default Test;
