import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function BeginTravel() {
    const [coordinates, setCoordinates] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [nearestStation, setNearestStation] = useState(null);

    // בקשה למיקום הגיאוגרפי של המשתמש אוטומטית
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setCoordinates({ lat: latitude, lng: longitude });

                // שליחה לשרת עם הקורדינטות
                fetchNearestStation(latitude, longitude);
            }, (error) => {
                setLocationError('לא הצלחנו לקבל את המיקום שלך');
            });
        } else {
            setLocationError('הדפדפן לא תומך במיקום גיאוגרפי');
        }
    }, []);

    const fetchNearestStation = async (lat, lng) => {
        try {
            const response = await fetch('/api/getNearestStation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lat, lng }),
            });

            if (response.ok) {
                const station = await response.json();
                setNearestStation(station);
            } else {
                setLocationError('לא הצלחנו למצוא תחנה קרובה');
            }
        } catch (error) {
            setLocationError('שגיאה בחיבור לשרת');
        }
    };

    return (
        <div className="begin-travel-container">
            {locationError && <p className="error-message">{locationError}</p>}

            {coordinates && (
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={coordinates}
                        zoom={15}
                    >
                        <Marker position={coordinates} />
                    </GoogleMap>
                </LoadScript>
            )}

            {nearestStation && (
                <div className="station-info">
                    <h3>תחנה קרובה:</h3>
                    <p>שם התחנה: {nearestStation.name}</p>
                    <p>כתובת: {nearestStation.address}</p>
                    <p>מרחק: {nearestStation.distance} מטרים</p>
                </div>
            )}
        </div>
    );
}

export default BeginTravel;
