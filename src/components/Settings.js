import React, {useState} from "react";
import {auth} from "../firebase/FirebaseConfig";
import { sendEmailVerification, deleteUser, updateEmail, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail} from "firebase/auth";
import {Container, Row} from "react-bootstrap";

const Settings = ({currentUser, setIsLoggedIn, setCurrentUser}) => {
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [notice, setNotice] = useState('');

    const deleteAccount = async () => {
        await deleteUser(auth.currentUser).then(() => {
            setIsLoggedIn(false);
        }).catch((err) => {
            console.log(err)
        })
    }


    const handleChangeEmail = async (e) => {
        e.preventDefault();

        if (newEmail.trim() === "" || currentPassword.trim() === "") {
            setNotice("Email and password cannot be empty.");
            return;
        }

        if (!auth.currentUser) {
            setNotice("No authenticated user found.");
            return;
        }

        // Check if the current user's email is verified
        if (!auth.currentUser.emailVerified) {
            setNotice("Please verify your current email before changing to a new email.");
            return;
        }

        try {
            // Step 1: Reauthenticate user
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
            await updateEmail(auth.currentUser, newEmail);
            await sendEmailVerification(auth.currentUser);
            setNotice('Email updated successfully. A verification email has been sent to your new email address.');
        } catch (error) {
            setNotice(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className="col-md-4 mt-3 pt-3 pb-3" onSubmit={handleChangeEmail}>
                    {notice &&
                        <div className="alert alert-warning" role="alert">
                            {notice}
                        </div>
                    }
                    <div className="form-floating mb-3">
                        <input
                            id="currentPassword"
                            type="password"
                            className="form-control"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            id="newEmail"
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="newEmail" className="form-label">New Email</label>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="dark-button pt-3 pb-3">Update Email</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Settings;