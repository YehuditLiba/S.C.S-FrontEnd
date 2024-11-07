import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './style.css';

function BeginTravel() {
    const currentUserFirstName = JSON.parse(sessionStorage.getItem('currentUser'))['name'].split(' ')[0];
    const [city, setCity] = useState();
    const [neighborhood, setNeighborhood] = useState();
    const [street, setStreet] = useState();
    const [homeNum, setHomeNum] = useState();
    const [state, setState] = useState(1);
    const [nearestStation, setNearestStation] = useState(null);
    const navigate = useNavigate();
    const getNearestStation = (userNum, userStreet, userNeighborhood, userCity) => {
        if (!(userNum && userStreet && userNeighborhood && userCity)) {
            alert('נא מלא את כל השדות')
        }
        else {
            fetch(`http://localhost:5073/api/Station?num=${userNum}&street=${userStreet}&neighborhood=${userNeighborhood}&city=${userCity}`, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    setNearestStation(data);
                    setState(2);
                })
                .catch((error) => {
                    console.log(error)
                    alert("ארעתה שגיאה בלתי צפויה, בבקשה נסה שנית")
                })
        }
    }
    const changeCarInSationMode = () => {
        let stationId = nearestStation.stationID;
        console.log(stationId + "!!!!!!!!!")
        fetch(`http://localhost:5073/api/Station/changeCarMode?stationId=${stationId}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (data == true){
                    alert(" 🚘 הרכב שלך😆 נסיעה בטוחה")
                    navigate("/Home")
                }
                else {
                    alert("אופס... משהו השתבש. בבקשה נסה שנית מאוחר יותר")
                }
            })
            .catch((error) => {
                console.log(error)
                alert("ארעתה שגיאה בלתי צפויה, בבקשה נסה שנית")
            })

    }
    return (
        <>
        <Navbar></Navbar>
        <h2>הרכב הפנוי אליך נמצא בכתובת:</h2>
        <h3>אגרות משה 25 רמת שלמה ירושלים</h3>
        <button style={{width:'100px'}}>לאישור תפיסת הרכב</button>
        <h3>שים לב. באם תעבור שעה והרכב לא ילקח בפועל הרי התפיסה מבוטלת</h3>
        <h3>בשעת לקיחת הרכב יש ללחוץ התפריט הראשי אישור</h3>
        </>
        // <>
        //     <Navbar></Navbar>
        //     {/* <h1>שלום {currentUserFirstName} 😄</h1> */}
        //     <h3>שלום דסי, מהי נקודת המוצא שלך?</h3> 
        //     {/* state 1 - when user begin travel */}
        //     {state == 1 &&
        //         <>
        //             {/* <h1>היכון, הכן...</h1> */}
        //             <button style={{width:'100px', height: '85px'}}>להשלמת כתובת אוטומטית</button>
        //             <div>
        //                 <label for="city">עיר</label>
        //                 <input type={"text"} id="city" name="city" onChange={(e) => setCity(e.target.value)} required />
        //                 <label for="neighborhood">שכונה</label>
        //                 <input type={"text"} id="neighborhood" name="neighborhood" onChange={(e) => setNeighborhood(e.target.value)} required />
        //                 <label for="street">רחוב</label>
        //                 <input type={"text"} id="street" name="street" onChange={(e) => setStreet(e.target.value)} required />
        //                 <label for="homeNum">מספר בנין</label>
        //                 <input type={"number"} id="homeNum" name="homeNum" onChange={(e) => setHomeNum(e.target.value)} required />
        //             </div>
                    
        //             <button style={{width:'100px', height: '75px'}} onClick={() => getNearestStation(homeNum, street, neighborhood, city)}>לחיפוש רכב קרוב פנוי</button>
        //         </>
        //     }
        //     {/* state 2 - when user would get the informtion about the nearest station */}
        //     {(state == 2 && nearestStation != null) &&
        //         <>
        //             <h1>הרכב הפנוי הקרוב אליך נמצא ב:</h1>
        //             <h3>{nearestStation.city}, {nearestStation.neighborhood}, {nearestStation.street} {nearestStation.number}</h3>
        //             <button onClick={changeCarInSationMode}>לאישור לקיחת הרכב לחץ כאן</button>
        //         </>
        //     }
        //     {(state == 2 && nearestStation == null) &&
        //         <>
        //             <h1>אופס... משהו השתבש. אנא נסה שנית מאוחר יותר</h1>
        //         </>

        //     }
        // </>
    )
}
export default BeginTravel; 