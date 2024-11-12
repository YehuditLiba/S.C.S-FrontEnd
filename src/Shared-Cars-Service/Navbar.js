import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { GiFlowerPot } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../pictures/smallLogo.png'
function Navbar() {
    const navigate = useNavigate();
    const handleStartJourney = () => {
        navigate("/begin-travel"); 
    };

    return (
        <>
        <br></br>
            <img src={logo} alt="Image" style={{ width: '200px', height: '100px' }} />
            <br></br><br></br>
            <button style={{width: '200px', height: '80px' }}>פרופיל אישי</button>
            <button style={{width: '200px', height: '80px' }}>הסטוריה</button>
            <button style={{width: '200px', height: '80px' }}>אודותינו</button>
            <button style={{ width: '200px', height: '80px' }}>אודותינו</button>
            {/* כפתור תחילת נסיעה */}
            <button
                style={{ width: '200px', height: '80px' }}
                onClick={handleStartJourney} // קישור לפונקציית הניווט
            >
                תחילת נסיעה
            </button>
            <button style={{width: '200px', height: '80px' }}>לסיום נסיעה</button>
            <button style={{width: '200px', height: '80px' }}>לאישור</button>


            {/* <Nav fill variant="tabs" defaultActiveKey="">
                <Nav.Item>
                    <Nav.Link onClick={() => { navigate("/History") }}><h5 style={{ color: '#17dfe2' }}>הסטוריה</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  onClick={() => { navigate("/EndTravel") }}><h5 style={{ color: '#17dfe2' }}>למציאת חניה ריווחית</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { navigate("/BeginTravel") }}><h5 style={{ color: '#17dfe2' }}>לתחילת נסיעה</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { navigate("/About") }}><h5 style={{ color: '#17dfe2' }}>אודותינו</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  onClick={() => { navigate("/Home") }}><h5 style={{ color: '#17dfe2' }}>דף הבית</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  onClick={() => { navigate("/Profile") }}><h5 style={{ color: '#17dfe2' }}>פרופיל</h5></Nav.Link>
                </Nav.Item>
            </Nav> */}
        </>
    );
}

export default Navbar;