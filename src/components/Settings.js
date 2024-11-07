import React, { useState } from "react";
import {auth} from "../firebase/FirebaseConfig";
import {
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";
import { Container } from 'react-bootstrap';
import SwitchSelector from "react-switch-selector";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = ({setIsLoggedIn}) => {
    const [displayEmail, setDisplayEmail] = useState(true);
    const [displayPassword, setDisplayPassword] = useState(false);
    const [displayDeletion, setDisplayDeletion] = useState(false);

    const authenticateUser = async (e, currentPassword) => {
        e.preventDefault();
        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            return true;
        } catch (error) {
            return false;
        }
    };

    const options = [
        {
            label: "Update Email",
            value: "updateEmail",
            selectedBackgroundColor: "#404040",
        },
        {
            label: "Update Password",
            value: "updatePassword",
            selectedBackgroundColor: "#404040",
        },
        {
            label: "Delete Account",
            value: "deleteAccount",
            selectedBackgroundColor: "#404040",
        }
    ]

    const handleSwitch = (newValue) => {
        setDisplayEmail(false);
        setDisplayPassword(false);
        setDisplayDeletion(false);

        if (newValue === "updateEmail") {
            setDisplayEmail(true);
        } else if (newValue === "updatePassword") {
            setDisplayPassword(true);
        } else if (newValue === "deleteAccount") {
            setDisplayDeletion(true);
        }
    }

    return (
        <Container className="login_container">
            <Container>
                <SwitchSelector
                    options={options}
                    fontSize={20}
                    border={"solid"}
                    onChange={handleSwitch}
                />
            </Container>
            {displayEmail ? <UpdateEmail authenticateUser={authenticateUser}/> : null}
            {displayPassword ? <UpdatePassword authenticateUser={authenticateUser}/> : null}
            {displayDeletion ? <DeleteAccount authenticateUser={authenticateUser} setIsLoggedIn={setIsLoggedIn}/> : null}
        </Container>
    )
}

export default Settings;