import React, { useEffect, useState } from "react";
import { auth } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {Button, Form, Alert, Container, Row, Col, FloatingLabel} from 'react-bootstrap';

const Signup = ({ setIsLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");

    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(auth.currentUser);
                setNotice("Verification email sent. Please check your inbox and verify your email.");
            } catch (error) {
                setNotice("Sorry, something went wrong. Please try again.");
                console.error("Signup error:", error);
            }
        } else {
            setNotice("Passwords don't match. Please try again.");
        }
    };

    useEffect(() => {
        let intervalId;
        const recheckVerification = async () => {
            if(auth.currentUser) {
                await auth.currentUser.reload();
                if(auth.currentUser.emailVerified){
                    setIsLoggedIn(true);
                    setNotice("Email verified successfully. You are now logged in.");
                    clearInterval(intervalId);
                } else {
                    setNotice("Email not verified yet. Please check your inbox.");
                }
            }
        }
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            intervalId = setInterval(recheckVerification, 5000);
        }
        return () => clearInterval(intervalId);
    }, [auth.currentUser, setIsLoggedIn]);

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col md={4}>
                    <Form onSubmit={signupWithUsernameAndPassword} className="mt-3 pt-3 pb-3">
                        {notice && (
                            <Alert variant="warning" role="alert">
                                {notice}
                            </Alert>
                        )}
                        <Form.Group className="mb-3" controlId="signupEmail">
                            <FloatingLabel
                                controlId="signupEmail"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupPassword">
                            <FloatingLabel
                                controlId="signupPassword"
                                label="Enter Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <FloatingLabel
                                controlId="signupPassword"
                                label="Confirm Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </FloatingLabel>

                        </Form.Group>
                        <Button type="submit" className="btn-dark w-100 pt-3 pb-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;