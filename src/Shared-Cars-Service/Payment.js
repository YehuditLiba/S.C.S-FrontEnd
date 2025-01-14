import React, { useState } from 'react';
import Navbar from "./Navbar";
import '../Shared-Cars-Service/Style/Payment.css';

export default function Payment() {
    const [paymentComplete, setPaymentComplete] = useState(false);

    const handlePayment = () => {
        setPaymentComplete(true);
    };

    return (
        <div className="end-travel-container">
            <Navbar />
            <br /><br />
            {!paymentComplete ? (
                <form className="input-container">
                    <label>מספר כרטיס</label><br />
                    <input type="number" required /><br />
                    <label>תוקף</label><br />
                    <input type="month" required /><br />
                    <label>שלוש ספרות בגב כרטיס</label><br />
                    <input type="number" required /><br /><br />
                    <input
                        style={{ backgroundColor: 'aqua' }}
                        type="button"
                        value="לתשלום סופי"
                        onClick={handlePayment}
                    />
                </form>
            ) : (
                <h3>נתראה בנסיעה הבאה!</h3>
            )}
        </div>
    );
}
