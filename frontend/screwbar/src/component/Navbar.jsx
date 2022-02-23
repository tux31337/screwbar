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
                <ul className="navbar__menu">
                    <li><a href="">test</a></li>
                    <li><a href="">test</a></li>
                    <li><a href="">test</a></li>
                    <li><a href="">test</a></li>
                    <li><a href="">test</a></li>
                </ul>
                <ul className="navbar__links">
                    <li><img className="logoutBtn" src="img/logout.svg" onClick={logout}/></li>
                    <li><a href="">2</a></li>
                    <li><a href="">3</a></li>
                </ul>
            
            </nav>
        </>
    )
}

export default Navbar;