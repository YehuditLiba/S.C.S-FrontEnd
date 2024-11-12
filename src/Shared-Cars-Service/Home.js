import React from 'react';
import { useUser } from './Context/UserContext'; // מיובא מהקובץ החדש
import Navbar from "./Navbar";
import cars_picture from '../pictures/cars3.jpg';

function Home() {
    const { currentUser } = useUser(); // שימוש בקונטקסט

    if (!currentUser) {
        return <h3>המשתמש לא זוהה. אנא התחבר מחדש.</h3>;
    }

    // השתמש ב-userName שמגיע מהקונטקסט
    const currentUserFirstName = currentUser?.name?.split(' ')[0] || 'משתמש לא זוהה';

    return (
        <>
            <Navbar />
            <h3>שלום {currentUserFirstName} :)</h3>
            <br />
            <img src={cars_picture} alt="Image" style={{ width: '100%', height: 'auto' }} />
        </>
    );
}

export default Home;
