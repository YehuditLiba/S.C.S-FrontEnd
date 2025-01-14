import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from "./Navbar";
import axios from 'axios';
import { useUser } from '../Shared-Cars-Service/Context/UserContext';
import { useNavigate } from 'react-router-dom';
import "../Shared-Cars-Service/Style/EndTravel.css";

function EndTravel() {
    const { currentUser } = useUser();
    const currentUserFirstName = currentUser ? currentUser.name.split(' ')[0] : '';

    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [locationError, setLocationError] = useState('');
    const [station, setStation] = useState(null);
    const [state, setState] = useState(1);

    const navigate = useNavigate(); // נוויגציה לעמוד התשלום

    const API_KEY = "AIzaSyBFwHxGY47K0J1ECt99_TZA7aVO62ztUp0";

    async function fetchStationData(latitude, longitude) {
        try {
            const response = await axios.post('http://localhost:5073/api/Station/GetLucrativeStation', {
                x: latitude,
                y: longitude,
                city,
                neighborhood,
                street,
                carNames: ["string"]
            });
            setStation(response.data);
            setState(2);
        } catch (error) {
            console.error("Error fetching station:", error);
            setLocationError('שגיאה באיתור תחנה');
        }
    }

    function handleManualLocationSubmit() {
        setLocationError('');
        if (!city || !neighborhood || !street) {
            setLocationError('אנא מלא את כל השדות');
            return;
        }

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},${neighborhood},${street}&key=${API_KEY}`)
            .then(response => {
                if (response.data.results.length > 0) {
                    const location = response.data.results[0].geometry.location;
                    fetchStationData(location.lat, location.lng);
                    setCoordinates({ lat: location.lat, lng: location.lng });
                } else {
                    setLocationError('לא נמצאה כתובת מתאימה');
                }
            })
            .catch(error => setLocationError('שגיאה באיתור הכתובת'));
    }

    // פונקציה שמעבירה לעמוד התשלום
    function handleConfirmStation() {
        navigate('/payment'); // נוויגציה לעמוד תשלום
    }

    return (
        <div className="end-travel-container">
            <Navbar />
            {locationError && <p className="error-message">{locationError}</p>}
            {state === 1 && (
                <>
                    <h3>שלום {currentUserFirstName}, באיזה מיקום אתה רוצה להחזיר את הרכב?</h3>
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
                    <button onClick={handleManualLocationSubmit}>חפש תחנה קרובה</button>
                </>
            )}
            {state === 2 && station && (
                <>
                    <h1>התחנה הקרובה ביותר להחזרת הרכב נמצאת ב:</h1>
                    <h3>{station.city}, {station.neighborhood}, {station.street}</h3>
                    <h4>תחנה עם חניות פנויות להחזרה</h4>

                    {coordinates && (
                        <LoadScript googleMapsApiKey={API_KEY}>
                            <GoogleMap
                                mapContainerClassName="google-map-container"
                                center={coordinates}
                                zoom={15}
                            >
                                <Marker position={coordinates} />
                            </GoogleMap>
                        </LoadScript>
                    )}
                    <button onClick={handleConfirmStation}>אישור החזרת רכב</button>
                </>
            )}
        </div>
    );
}

export default EndTravel;
