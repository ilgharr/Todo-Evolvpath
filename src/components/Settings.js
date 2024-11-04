import React from "react";
import User from "../firebase/User";
import {auth} from "../firebase/FirebaseConfig";
import { sendEmailVerification } from "firebase/auth";

const Settings = ({currentUser, setIsLoggedIn, setCurrentUser}) => {
    // change email
    // change password
    // delete account

    // all of these need 2fa

    //setCurrentUser(auth.currentUser);

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser).then(() => {})
    }

    return (
        <div className="settings">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: '#343a40'
            }}>
                <button onClick={() => {emailVerification()}}>email verification</button>
            </div>
        </div>
    )

}

export default Settings;