import Navbar from "./Navbar";
import logo from '../pictures/smallLogo.png'
import cars_picture from '../pictures/cars3.jpg'
function Home() {
    const currentUserFirstName = JSON.parse(sessionStorage.getItem('currentUser'))['name'].split(' ')[0]
    return (
        <>
            <Navbar></Navbar>
            {/* <div style={{color:'white', backgroundImage:{cars_picture}}}>
            נמאס לכם לשלם כהוגן על רכב שכור?
            </div> */}
            <h3>שלום {currentUserFirstName} :)</h3>
            <br></br>
            <img src={cars_picture} alt="Image" style={{ width: '100%', height: 'auto' }} />
        </>
    )
}
export default Home;