import {Container, Alert, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {sendPasswordResetEmail, updatePassword} from "firebase/auth";
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
            setNotice('Authentication failed. Password change aborted.')
        }
    }

    return(
        <Container>
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
                            <Col xs="auto">
                                <button className="dark-button pt-3 pb-3" type="submit">Send Email</button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdatePassword