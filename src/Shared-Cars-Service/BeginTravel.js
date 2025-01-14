import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from "./Navbar";
import './style.css';
import axios from 'axios';
import { useUser } from '../Shared-Cars-Service/Context/UserContext';  // קונטקסט המשתמש

function BeginTravel() {
    const { currentUser } = useUser();  // שימוש בקונטקסט כדי לקבל את פרטי המשתמש
    const currentUserFirstName = currentUser ? currentUser.name.split(' ')[0] : '';

    const [locationMethod, setLocationMethod] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState(1);
    const [nearestStation, setNearestStation] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rentalConfirmation, setRentalConfirmation] = useState(null);  // מצב אישור השכירות
    const navigate = useNavigate();

    const API_KEY = "AIzaSyBFwHxGY47K0J1ECt99_TZA7aVO62ztUp0";

    async function fetchNearestStation(latitude, longitude) {
        try {
            const response = await axios.post('http://localhost:5073/api/Station/GetNearestStation', {
                x: latitude,
                y: longitude
            });
            console.log("Station data:", response.data);
            setNearestStation(response.data);
            setState(2);
        } catch (error) {
            console.error("Error fetching nearest station:", error);
            setLocationError('שגיאה באיתור תחנה קרובה');
        }
    }

    function handleManualLocationSubmit() {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},${neighborhood},${street}&key=${API_KEY}`)
            .then(response => {
                if (response.data.results.length > 0) {
                    const location = response.data.results[0].geometry.location;
                    fetchNearestStation(location.lat, location.lng);
                    setCoordinates({ lat: location.lat, lng: location.lng });
                } else {
                    setLocationError('לא נמצאה כתובת מתאימה');
                }
            })
            .catch(error => setLocationError('שגיאה באיתור הכתובת'));
    }

    function handleAutomaticLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setCoordinates({ lat: latitude, lng: longitude });
                    fetchNearestStation(latitude, longitude);
                },
                (error) => setLocationError('לא הצלחנו לקבל את המיקום שלך')
            );
        } else {
            setLocationError('הדפדפן לא תומך במיקום גיאוגרפי');
        }
    }

    async function handleConfirmRental() {
        if (!startDate || !endDate) {
            alert("נא למלא תאריכי התחלה וסיום");
            return;
        }

        // יצירת אובייקט שכירות חדש
        const rentalData = {
            carName: nearestStation.carNames[0],  // שם הרכב הקרוב
            userName: currentUserFirstName,  // השם של המשתמש מתוך הקונטקסט
            startDate: startDate,  // תאריך התחלה
            endDate: endDate,  // תאריך סיום
        };

        console.log("Sending rental data:", rentalData);  // הדפסת הנתונים לפני השליחה

        try {
            alert("הרכב מחכה לך בתחנה, תודה ולהתראות");
            navigate('/success');
            // שליחה לשרת
            const response = await axios.post('http://localhost:5073/api/Rental', rentalData);
            console.log('Rental confirmed', response.data);  // הצלחה

            // עדכון הסטטוס של הרכב והתחנה
            const updateData = {
                name: nearestStation.carNames[0],  // שם הרכב
                stationId: nearestStation.id,  // ID של התחנה
            };

            console.log("Sending car status update:", updateData);  // הדפסת הנתונים לפני השליחה של ה- PUT

            const updateResponse = await axios.put('http://localhost:5073/api/Car/rentByName', null, {
                params: updateData
            });

            console.log('Car status updated:', updateResponse.data);  // הצלחה בעדכון סטטוס הרכב

            // עדכון הודעת אישור השכירות
            setRentalConfirmation("הרכב מחכה לך בתחנה, תודה ולהתראות");

            // ניווט לדף הצלחה
            navigate('/success');  // דוגמה לניווט לאחר אישור ההזמנה

        } catch (error) {
            console.error("Error confirming rental:", error);  // טיפול בשגיאות
        }
    }

    return (
        <div className="begin-travel-container">
            <Navbar />
            {locationError && <p className="error-message">{locationError}</p>}
            {state === 1 && !locationMethod && (
                <>
                    <h3>?שלום {currentUserFirstName}, כיצד ברצונך לחפש את המיקום</h3>
                    <div>
                        <button onClick={() => { setLocationMethod('auto'); handleAutomaticLocation(); }}>
                            מיקום אוטומטי
                        </button>
                        <button onClick={() => setLocationMethod('manual')}>
                            הזנת מיקום ידנית
                        </button>
                    </div>
                </>
            )}
            {state === 1 && locationMethod === 'manual' && (
                <>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="עיר"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="שכונה"
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="רחוב"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <button onClick={handleManualLocationSubmit}>חפש רכב לפי מיקום ידני</button>
                    </div>
                </>
            )}

            {state === 2 && nearestStation && (
                <>
                    <h1>הרכב הפנוי הקרוב אליך נמצא ב:</h1>
                    <h3>{nearestStation.city}, {nearestStation.neighborhood}, {nearestStation.street}</h3>
                    <h4>שם הרכב: {nearestStation.carNames[0]}</h4>

                    {/* תאריכים */}
                    <div className="date-inputs">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <button onClick={handleConfirmRental}>לאישור לקיחת הרכב לחץ כאן</button>

                    {coordinates && (
                        <LoadScript googleMapsApiKey={API_KEY}>
                            <GoogleMap mapContainerClassName="map-container" center={coordinates} zoom={15}>
                                <Marker position={coordinates} />
                            </GoogleMap>
                        </LoadScript>
                    )}
                </>
            )}
            {rentalConfirmation && <p>{rentalConfirmation}</p>}  {/* הצגת הודעת אישור לאחר סיום */}
        </div>
    );
}

export default BeginTravel;
