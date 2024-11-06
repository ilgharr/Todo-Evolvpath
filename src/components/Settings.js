import React, {useState} from "react";
import {auth} from "../firebase/FirebaseConfig";
import {
    sendPasswordResetEmail,
    deleteUser,
    updateEmail,
    reauthenticateWithCredential,
    verifyBeforeUpdateEmail,
    updatePassword,
    EmailAuthProvider
} from "firebase/auth";
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const Settings = ({currentUser, setIsLoggedIn, setCurrentUser}) => {
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [notice, setNotice] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const authenticateUser = async (e) => {
        e.preventDefault();

        if (newEmail.trim() === "" || currentPassword.trim() === "") {
            setNotice("Email and password cannot be empty.");
            return;
        }

        if (!auth.currentUser) {
            setNotice("No authenticated user found.");
            return;
        }

        if (!auth.currentUser.emailVerified) {
            setNotice("Please verify your current email before changing to a new email.");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            setNotice("Successfully authenticated!");
            setTimeout(5000);
        } catch (error) {
            setNotice(`${error.message}`);
        }
    };

    const updateEmailProcess = async (auth, newEmail) => {
        try {
            await verifyBeforeUpdateEmail(auth.currentUser, newEmail);

            try {
                await updateEmail(auth.currentUser, newEmail);
            } catch (error) {
                setNotice(`You must verify your new email.`);
            }
        } catch (error) {
            setNotice(`${error.message}`);
        }
    };
    const handleChangeEmail = async (e) => {
        await authenticateUser(e)
        await updateEmailProcess(auth, newEmail);
    }

    const updatePasswordProcess = async (auth, newPassword) => {
        try {
            await sendPasswordResetEmail(auth, auth.currentUser.email);

            try {
                await updatePassword(auth.currentUser, newPassword);
            } catch (error) {
                setNotice(`You must verify change of password from email.`);
            }
        } catch (error) {
            setNotice(`${error.message}`);
        }

    }
    const handleChangePassword = async (e) => {
        await authenticateUser(e)
        await updatePasswordProcess(auth, newPassword)
    }

    const deleteAccountProcess = async (auth) => {
        await deleteUser(auth.currentUser).then(() => {
            setIsLoggedIn(false);
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleAccountDelete =async (e) => {
        await authenticateUser(e);
        await deleteAccountProcess(auth)
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="mt-3 pt-3 pb-3">
                    <Form onSubmit={handleChangeEmail}>
                        {notice && (
                            <Alert variant="warning">
                                {notice}
                            </Alert>
                        )}
                        <Row className="g-3 mb-3 align-items-end">
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        id="newEmail"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <button className="dark-button pt-3 pb-3" type="submit">Update Email</button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8} className="mt-3 pt-3 pb-3">
                    <Form onSubmit={handleChangePassword}>
                        {notice && (
                            <Alert variant="warning">
                                {notice}
                            </Alert>
                        )}
                        <Row className="g-3 mb-3 align-items-end">
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        id="newPassword"
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        id="confirmNewPassword"
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <button className="dark-button pt-3 pb-3" type="submit">Update Password</button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8} className="mt-3 pt-3 pb-3">
                    <Form onSubmit={handleAccountDelete}>
                        {notice && (
                            <Alert variant="warning">
                                {notice}
                            </Alert>
                        )}
                        <Row className="g-3 mb-3 align-items-end">
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <button className="dark-button pt-3 pb-3" type="submit">Delete Account</button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Settings;