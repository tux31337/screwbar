import axios from "axios";
import "../css/navbar.css"
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();

    function logout() {
        axios.get('/auth/logout').then(() => {
            navigate('/login');
        })
    }

    return(
        <>
            <nav className="navbar">
                <div className="navbar__logo">
                    <img src="img/screwbar2.png" className="navbar__logo__img"></img>
                </div>
                <ul className="navbar__links">
                    <li><a href="">홈</a></li>
                    <li><a href="">운동</a></li>
                    <li><img className="logoutBtn" src="img/logout.svg" onClick={logout}/></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;