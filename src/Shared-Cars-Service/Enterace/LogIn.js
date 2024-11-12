import './LogIn.css';
import React, { useState } from 'react';
import logo from "../../pictures/smallLogo.png";
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { useUser } from '../Context/UserContext';  // Import the context

function LogIn() {
  const navigate = useNavigate();
  const { logIn } = useUser();  // Access the login function from context
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // פונקציה לנסות להתחבר עם שם משתמש וסיסמא
  const tryToLogin = (userName, userPassword) => {
    fetch(`http://localhost:5073/api/User/${userName}`, {
      method: 'GET',
      headers: {
        "password": userPassword
      }
    })
      .then((res) => {
        console.log("Response status:", res.status);  // לוג סטטוס התגובה
        if (res.ok) {
          return res.json(); // אם התגובה תקינה, מחזירים את המידע
        } else {
          throw new Error("User not found");  // אם המשתמש לא נמצא, מציגים שגיאה
        }
      })
      .then((data) => {
        console.log("Login successful:", data);  // לוג המידע שמתקבל מהשרת

        // שימוש בפונקציה של הקונטקסט כדי לשמור את המידע על המשתמש
        logIn({
          name: data.name,
          email: data.email
        });

        navigate("/Home");  // נווט לעמוד הבית אחרי התחברות מוצלחת
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("User not found. Please sign up.");  // הצגת הודעת שגיאה במקרה של כשלון
        navigate("/SignUp");  // נווט לעמוד הרשמה
      });
  };

  return (
    <>
      <br></br>
      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src={logo} style={{ width: '250px', height: '115px' }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1" style={{ color: "White" }}>ברוכים הבאים לשירות רכב שיתופי ריווחי</h4>
              </div>
              <MDBInput wrapperClass='mb-4' label='   השם   ' labelStyle={{ color: 'white' }} id='form1' type='text' onChange={(e) => setUserName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='סיסמא' labelStyle={{ color: 'white' }} id='form2' type='password' onChange={(e) => setUserPassword(e.target.value)} />
              <div className="text-center pt-1 mb-5 pb-1">
                <button style={{ color: 'black' }} onClick={() => { tryToLogin(userName, userPassword) }}>
                  היכנס
                </button>
              </div>
              <p className="mb-0" style={{ color: "white" }}>?עוד לא נרשמת</p>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <MDBBtn outline className='mx-2' color='light' style={{ color: "white" }} onClick={() => navigate("/SignUp")}>
                  הירשם עכשיו
                </MDBBtn>
              </div>
            </div>
          </MDBCol>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <p className="small mb-0" style={{ "text-align": "center" }}>
                  אז מה זה בעצם shared-cars-service ואיך משתמשים בו?
                  {/* המשך הטקסט ההסברתי */}
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default LogIn;
