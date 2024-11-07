import React, { useEffect, useState } from 'react';
import logo from "../../pictures/smallLogo.png";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();
    const tryToSignUp = (userName, userEmail, userPassword) => (e) => {
        fetch(`http://localhost:5073/api/User`, { method: 'POST', body: { userName, userEmail, userPassword } })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                console.log("signup sucsesfully");
                navigate("/Home")
            })
            .catch(()=>{alert("something get wrong, please try again")})
    }
    return (
        <>
        <br></br>
            <MDBContainer className="my-5 gradient-form" style={{width:"50%"}}>
                {/* <MDBRow><br></br><br></br><br></br></MDBRow> */}
                <MDBRow>
                    <MDBCol col='6' className="mb-5">
                        <div className="d-flex flex-column ms-5">

                            <div className="text-center">
                                <img src={logo}
                                    style={{ width: '250px', height: '115px' }} alt="logo" />
                                    <br></br>
                                <h4 className="mt-1 mb-5 pb-1" style={{ color: "HighlightText" }}>ברוכים הבאים לשירות רכב שיתופי ריווחי</h4>
                            </div>
                            <br></br><br></br>

                            <MDBInput wrapperClass='mb-4' label='שם משתמש' labelStyle={{ color: 'white' }} id='form1' type='text' onChange={(e) => setUserName(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='אימייל' labelStyle={{ color: 'white' }} id='form2' type='email' onChange={(e) => setUserEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='סיסמא' labelStyle={{ color: 'white' }} id='form2' type='password' onChange={(e) => setUserPassword(e.target.value)} />


                            <div className="text-center pt-1 mb-5 pb-1">
                                <MDBBtn className="mb-4 w-100 gradient-custom-2" style={{width:"2%"}} onClick={() => tryToSignUp(userName, userEmail, userPassword)}>
                                    הירשם
                                </MDBBtn>
                                {/* <a className="text-muted" href="#!" style={{color:"white"}}>?שכחת סיסמא</a> */}
                                {/* <a className="text-muted" style={{ color: "white" }}>?שכחת סיסמא</a> */}
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <MDBBtn outline className='mx-2' color='light' style={{ color: "white" }} onClick={() => navigate("/LogIn")}>
                                    היכנס פה
                                </MDBBtn>
                                <p className="mb-0" style={{ color: "white" }}>משתמש רשום במערכת?</p>

                            </div>

                        </div>
                    </MDBCol>
                </MDBRow>
                {/* <MDBRow><br></br><br></br><br></br></MDBRow> */}
            </MDBContainer>
        </>
    );
};
export default SignUp;
