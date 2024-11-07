import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './style.css';


function EndTravel() {
    const currentUserFirstName = JSON.parse(sessionStorage.getItem('currentUser'))['name'].split(' ')[0];
    const [numOfRentalHours, setNumOfRentalHours] = useState();
    const [city, setCity] = useState();
    const [neighborhood, setNeighborhood] = useState();
    const [street, setStreet] = useState();
    const [homeNum, setHomeNum] = useState();
    const [state, setState] = useState(1);
    const navigate = useNavigate();
    const endTravel = (numOfRentalHours, homeNum, street, neighborhood, city) => {
        // fetch(`http://localhost:5073/api/Station/${numOfRentalHours}?num=${homeNum}&street=${street}&neighborhood=${neighborhood}&city=${city}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("getting successfully" + data);

        //     })
    }
    return (
        <>
        <Navbar />
        <h2>החניה הריווחית שלך ממוקמת ב-</h2>
        <h3>מנחת יצחק 27</h3>
        <h3>התחנה היא מרחק 0.37 ק"מ מהיעד שלך - מרחק הליכה סביר</h3>
        <h3>בנסיעה זו חסכת - 48 ש"ח</h3>
        <button style={{width:'100px'}}>לתפיסת החניה</button>
        <h3>בעת הגעה לחניה יש ללחוץ אישור בתפריט הראשי</h3>
        <h3>שים לב במידה ולא תאשר הגעה לחניה בשעתיים הקרובות מתבטלת תפיסת החניה ועלות השכירות ממשיכה לעלות</h3>

        </>
        // <>
        //     <Navbar />
        //     {/* <h1>שלום {currentUserFirstName} </h1> */}
        //     <h3>שלום דסי:)</h3>
        //     {/* state 1 - when user begin travel */}
        //     {state == 1 &&
        //         <>
        //             <h3>מהי נקודת היעד שלך?</h3><br></br>
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
        //             {/* <label for="numOfRentalHours">לכמה שעות שכרת את הרכב ? </label><br></br> */}
        //             {/* <input type={"number"} id="numOfRentalHours" onChange={(e) => setNumOfRentalHours(e.target.value)} required /> */}
        //             <br></br>
        //             <button style={{width:'100px'}} onClick={() => endTravel(numOfRentalHours, homeNum, street, neighborhood, city)}>למציאת תחנה ריווחית</button>
        //         </>
        //     }
        //     {/* state 2 - when user would get the informtion about the nearest station */}
        //     {/* {(state == 2 && nearestStation != null) &&
        //         <>
        //             <h1>הרכב הפנוי הקרוב אליך נמצא ב:</h1>
        //             <h3>{nearestStation.city}, {nearestStation.neighborhood}, {nearestStation.street} {nearestStation.number}</h3>
        //             <button onClick={changeCarInSationMode}>לאישור לקיחת הרכב לחץ כאן</button>
        //         </>
        //     } */}
        // </>
    )

}
export default EndTravel;