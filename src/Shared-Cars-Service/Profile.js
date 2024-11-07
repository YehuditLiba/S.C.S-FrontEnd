import Navbar from "./Navbar";

function Profile(){
    return(
        <>
        <Navbar></Navbar>
        <br /> <br />
        <div style={{direction: 'rtl', fontFamily: 'fantasy'}}>
            <label>השם:</label>
            <input type={'text'} placeholder={'דסי'}></input>
            <br /><br />
            <label>משפחה:</label>
            <input type={'text'} placeholder={'גינסברגר'}></input>
            <br /><br />
            <label>אימייל:</label>
            <input type={'text'} placeholder={'d0504119627@gmail.com'}></input>
            <br /><br />
            <label>כתובת:</label>
            <input type={'text'} placeholder={'אגרות משה 10'}></input>
            <br />
        </div>
        <button>לשמירת השינויים</button>
        </>
    )
}
export default Profile;