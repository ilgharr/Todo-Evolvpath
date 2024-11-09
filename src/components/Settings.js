import React, {useState} from "react";
import {auth} from "../firebase/FirebaseConfig";
import {reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {Container} from 'react-bootstrap';
import SwitchSelector from "react-switch-selector";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = ({setIsLoggedIn}) => {
    const [displayEmail, setDisplayEmail] = useState(true);
    const [displayPassword, setDisplayPassword] = useState(false);
    const [displayDeletion, setDisplayDeletion] = useState(false);

    const authenticateUser = async (event, currentPassword) => {
        event.preventDefault();
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
        {label: "Change Email", value: "updateEmail", selectedBackgroundColor: "#404040"},
        {label: "Change Password", value: "updatePassword", selectedBackgroundColor: "#404040"},
        {label: "Delete Account", value: "deleteAccount", selectedBackgroundColor: "#404040"}
    ];

    const resetDisplayStates = () => {
        setDisplayEmail(false);
        setDisplayPassword(false);
        setDisplayDeletion(false);
    };

    const handleSwitch = (selectedValue) => {
        resetDisplayStates();
        if (selectedValue === "updateEmail") {
            setDisplayEmail(true);
        } else if (selectedValue === "updatePassword") {
            setDisplayPassword(true);
        } else if (selectedValue === "deleteAccount") {
            setDisplayDeletion(true);
        }
    };

    return (
        <Container className="login_container">
            <Container className="switch-selector-container">
                <SwitchSelector
                    options={options}
                    fontSize={20}
                    border={"solid"}
                    onChange={handleSwitch}
                />
            </Container>
            <Container className="account-container">
                {displayEmail && <UpdateEmail authenticateUser={authenticateUser}/>}
                {displayPassword && <UpdatePassword authenticateUser={authenticateUser}/>}
                {displayDeletion && <DeleteAccount authenticateUser={authenticateUser} setIsLoggedIn={setIsLoggedIn}/>}
            </Container>
        </Container>
    );
};

export default Settings;