import {Container, Alert, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {updateEmail, verifyBeforeUpdateEmail} from "firebase/auth";
import {auth} from "../firebase/FirebaseConfig";


const UpdateEmail = ({authenticateUser}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [notice, setNotice] = useState("");

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
        const isAuthenticated = await authenticateUser(e, currentPassword);
        if (isAuthenticated) {
            await updateEmailProcess(auth, newEmail)
        } else {
            setNotice('Authentication failed. Email change aborted.')
        }
    };

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
        </Container>
    )
}

export default UpdateEmail;