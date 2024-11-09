import {Container, Alert, Col, Form, Row, FloatingLabel, Button} from "react-bootstrap";
import React, {useState} from "react";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebase/FirebaseConfig";

const UpdatePassword = ({authenticateUser}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [notice, setNotice] = useState('');

    const handleChangePassword = async (e) => {
        const isAuthenticated = await authenticateUser(e, currentPassword)
        if(isAuthenticated) {
            setNotice("Change of password email has been sent.")
            await sendPasswordResetEmail(auth, auth.currentUser.email);
        } else {
            setNotice('Authentication failed. Password change aborted.');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="mt-3 pt-3 pb-3">
                    <Form onSubmit={handleChangePassword}>
                        {notice && (
                            <Alert variant="warning">
                                {notice}
                            </Alert>
                        )}
                        <Col className="mb-3">
                            <Form.Group>
                                <FloatingLabel
                                    controlId="currentPassword"
                                    label="Current Password"
                                    className="mb-3"
                                >
                                    <Form.Control
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
                        <Col xs="auto">
                            <Button className="btn-dark pt-3 pb-3 w-100" type="submit">
                                Send Email
                            </Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdatePassword;