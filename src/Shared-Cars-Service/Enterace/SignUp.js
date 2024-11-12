import React, { useState } from 'react';
import logo from "../../pictures/smallLogo.png";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext'; // ייבוא הקונטקסט של היוזר

function SignUp() {
    const { logIn } = useUser(); // שימוש ב-logIn מתוך הקונטקסט
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const tryToSignUp = async (userName, userEmail, userPassword) => {
        console.log("Attempting to sign up:", { userName, userEmail, userPassword });

        // בדיקת שדות לפני שליחה
        if (!userName || !userEmail || !userPassword) {
            alert("All fields are required");
            return;
        }

        try {
            // בניית ה-URL עם ה-query parameters (כפי שעשית ב-Swagger)
            const url = new URL('http://localhost:5073/api/User');
            url.searchParams.append('email', userEmail); // מייל כ-query parameter
            url.searchParams.append('password', userPassword); // סיסמא כ-query parameter

            // שליחה של השם כ-body בבקשה (כמו בשדה ב-Swagger)
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userName)  // שלח את השם בגוף הבקשה
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error from server:", errorData);

                // אם השרת מחזיר שגיאות בוולידציה, הצג אותן
                if (errorData.errors) {
                    let errorMessage = 'Validation errors:';
                    for (const field in errorData.errors) {
                        errorMessage += `\n${field}: ${errorData.errors[field].join(", ")}`;
                        console.error(`${field}: ${errorData.errors[field].join(", ")}`);
                    }
                    alert(errorMessage); // הצג למשתמש את השגיאות
                } else {
                    // הדפסת הודעת שגיאה כללית
                    alert("Sign up failed: " + (errorData.title || "Unknown error"));
                    throw new Error(errorData.title || "Sign up failed");
                }
            }

            const data = await res.json();  // התגובה היא אובייקט JSON
            console.log("Response from server:", data);

            if (data && data.name) {  // עדכון רק אם יש נתונים תקינים
                console.log("User signed up successfully:", data);
                logIn(data); // עדכון המידע בקונטקסט
                sessionStorage.setItem('currentUser', JSON.stringify(data)); // שמור ב-sessionStorage
            }

            navigate("/Home"); // נווט לדף הבית לאחר הצלחה
        } catch (err) {
            console.error("Error:", err);
            alert("Sign up failed, please try again.");
        }
    };

    return (
        <MDBContainer className="my-5 gradient-form" style={{ width: "50%" }}>
            <MDBRow>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5">
                        <div className="text-center">
                            <img src={logo} style={{ width: '250px', height: '115px' }} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1" style={{ color: "HighlightText" }}>ברוכים הבאים לשירות רכב שיתופי ריווחי</h4>
                        </div>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='שם משתמש'
                            labelStyle={{ color: 'white' }}
                            id='userName'
                            type='text'
                            autoComplete='username'
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='אימייל'
                            labelStyle={{ color: 'white' }}
                            id='email'
                            type='email'
                            autoComplete='email'
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='סיסמא'
                            labelStyle={{ color: 'white' }}
                            id='password'
                            type='password'
                            autoComplete='new-password'
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <div className="text-center pt-1 mb-5 pb-1">
                            <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={() => tryToSignUp(userName, userEmail, userPassword)}>
                                הירשם
                            </MDBBtn>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SignUp;
