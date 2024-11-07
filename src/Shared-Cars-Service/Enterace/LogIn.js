import './LogIn.css';
import React from 'react';
import logo from "../../pictures/smallLogo.png";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function LogIn() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const tryToLogin = (userName, userPassword) => {
    fetch(`http://localhost:5073/api/User/${userName}`, { method: 'POST', headers: { "password": userPassword } })
      .then((res) => res.json())
      .then((data) => {
        console.log("login successfully");
        sessionStorage.setItem('currentUser', JSON.stringify({'name': data["name"], 'email':data['email'] }))
        navigate("/Home");
      })

  }
  return (
    <>
      <br></br>
      <MDBContainer className="my-5 gradient-form">

        <MDBRow>

          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

              <div className="text-center">
                <img src={logo}
                  style={{ width: '250px', height: '115px' }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1" style={{ color: "White" }}>ברוכים הבאים לשירות רכב שיתופי ריווחי</h4>
              </div>

              <MDBInput wrapperClass='mb-4' label='   השם   ' labelStyle={{ color: 'white' }} id='form1' type='text' onChange={(e) => setUserName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='סיסמא' labelStyle={{ color: 'white' }} id='form2' type='password' onChange={(e) => setUserPassword(e.target.value)} />


              <div className="text-center pt-1 mb-5 pb-1">
                <button  style={{color:'black'}} onClick={() => {
                  tryToLogin(userName, userPassword)
                }}>
                  היכנס
                </button>
                {/* <a className="text-muted" href="#!" style={{color:"white"}}>?שכחת סיסמא</a> */}
                {/* <a className="text-muted" style={{color:"white"}}>?שכחת סיסמא</a> */}
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
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                {/* <h4 class="mb-4">אז מה זה בעצם shared-cars-service ואיך משתמשים בו?</h4> */}
                <p class="small mb-0" style={{ "text-align": "center" }}>
                  אז מה זה בעצם shared-cars-service ואיך משתמשים בו?
                  <br></br>
                  קודם כל נרשמים-
                  נכנסים לאתר, ממלאים פרטים אישיים (שם, מייל,סיסמא ופרטי אשראי)
                  <br></br>
                  כשרוצים להתחיל נסיעה- נכנסים לאתר, ממלאים איפה אתם נמצאים והמערכת תיתן לכם כתובת של הרכב הקרוב ביותר,
                  נגבת מחשבונכם מקדמה בסך ??? ש"ח
                  <br></br>
                  עכשיו הרכב בידיים שלכם, תסעו בו כמה שאתם רוצים, לאיפה שאתם רוצים עד מקסימום חודש (אחרי חודש אם לא תחזירו ולא תענו לאזהרה שתישלח אליכם במייל, זהירות! עלות הרכב תיגבה מחשבונכם!!)
                  עלות השכירות עד יום - עולה ?? לשעה
                  החל מיום שלם העלות היא - ?? ליום
                  בחודשים יולי אוגוסט העלות היא גבוהה יותר ב- 10%
                  <br></br>
                  איך מחזירים?
                  <br></br>
                  נכנסים למערכת, מכניסים תחנת יעד והמערכת מביאה לכם מה התחנה הכי קרובה ומה התחנה הריווחית בשבילכם (או שזה פשוט אותה תחנה:) וכמובן כמה תעלה לכם כל אחת מהאפשרויות הנ"ל.
                  מה זאת אומרת תחנה ריווחית?
                  חלק מהחניות שלנו ברחבי העולם מוגדרות כתחנות מרכזיות וחלק לא, תלוי כמובן במיקום
                  אם מחזירים את הרכב לתחנה מרכזית מקבלים ?? אחוזי הנחה על כל ימי השכירות- רטואקטיבית
                  במקרה שיש תחנה מרכזית שהיא במרחק הליכה מהיעד שלכם שווה כמובן לרדת בה, לא?!
                  נכון שגם אם מונית ספיישל מהתחנה המרכזית עד היעד המדויק שלכם תעלה פחות מההנחה שתקבלו שווה את זה?!
                  זהו, אז את כל החישובים האלו אנחנו עושים בשבילכם!!
                  עכשיו מה שנשאר לכם זה פשוט לאשר באיזו תחנה אתם תכף עומדים לחנות ולהחזיר לנו את הרכב:)
                  יגבה מחשבונכם הסכום לתשלום עפ"י החניה שבחרתם.



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

