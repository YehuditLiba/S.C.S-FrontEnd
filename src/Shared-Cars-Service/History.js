import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useUser } from '../Shared-Cars-Service/Context/UserContext';
import axios from "axios";

function History() {
    const { currentUser } = useUser(); // קבלת המשתמש הנוכחי מהקונטקסט
    const [rentals, setRentals] = useState([]);

    // לוגים כדי לוודא שהמשתמש נמצא
    console.log("Current user from context:", currentUser);

    useEffect(() => {
        if (currentUser && currentUser.name) {  // לוודא שהמשתמש קיים ושהשם משתמש לא ריק
            console.log('Current user:', currentUser); // לוודא שהמשתמש קיים

            // שליחת בקשה לשרת עם currentUser.name (ולא userName)
            axios.get(`http://localhost:5073/api/Rental/byUserName/${encodeURIComponent(currentUser.name)}`)
                .then(response => {
                    console.log("Rentals fetched:", response.data); // לוג התשובה
                    setRentals(response.data);
                })
                .catch(error => {
                    console.error("Error fetching rentals:", error); // לוג שגיאה
                    if (error.response) {
                        console.error("Error response:", error.response.data); // שגיאה מהשרת
                    }
                });
        } else {
            console.log('No current user found or userName is missing'); // הודעה אם אין משתמש או שם משתמש
        }
    }, [currentUser]);  // תלות ב- currentUser

    return (
        <>
            <Navbar />
            <h3>היסטוריית השכרות</h3>
            {rentals.length > 0 ? (
                <table style={{ textAlign: 'center', width: '100%', borderCollapse: 'collapse' , color: "white"}}>
                    <thead>
                        <tr>
                            <th>כתובת מקור</th>
                            <th>כתובת יעד</th>
                            <th>עלות הנסיעה</th>
                            <th>סך ההנחה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map((rental, index) => (
                            <tr key={index}>
                                <td>{rental.startDate}</td>
                                <td>{rental.endDate}</td>
                                <td>{rental.carName}</td>
                                <td>{"חסכת בנסיעה זו 45$"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3>-עדיין אין לך היסטורית נסיעות-</h3>
            )}
        </>
    );
}

export default History;
