import {Container, Alert, Col, Form, Row, Button, FloatingLabel} from "react-bootstrap";
import React, {useState} from "react";
import {verifyBeforeUpdateEmail} from "firebase/auth";
import {auth} from "../firebase/FirebaseConfig";

const sendEmailVerification = async (user, email, setNotice) => {
    try {
        await verifyBeforeUpdateEmail(user, email);
        setNotice(`A confirmation email will be sent to the new address if the provided email is valid.`);
    } catch (error) {
        setNotice(error.message);
    }
};

const UpdateEmail = ({authenticateUser}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [notice, setNotice] = useState("");

    const handleChangeEmail = async (event) => {
        event.preventDefault();
        if (await authenticateUser(event, currentPassword)) {
            await sendEmailVerification(auth.currentUser, newEmail, setNotice);
        } else {
            setNotice('Authentication failed. Email change aborted.');
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
                        <Col className="mb-3">
                            <Form.Group>
                                <FloatingLabel controlId="signupPassword" label="Password" className="mb-3">
                                    <Form.Control
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col className="mb-3">
                            <Form.Group>
                                <FloatingLabel controlId="newEmail" label="New Email" className="mb-3">
                                    <Form.Control
                                        id="newEmail"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col className="text-center">
                            <Button className="btn-dark pt-3 pb-3 w-100" type="submit">Update Email</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateEmail;