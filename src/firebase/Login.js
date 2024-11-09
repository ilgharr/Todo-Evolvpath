import React, {useState} from "react";
import {auth} from "./FirebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Container, Row, Col, Form, Button, Alert, FloatingLabel} from 'react-bootstrap';

const Login = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (auth.currentUser.emailVerified) {
                setIsLoggedIn(true);
            } else {
                setNotice("Your email address is not verified. Please check your inbox.");
            }
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} className="mt-3 pt-3 pb-3">
                    <Form>
                        {notice !== "" &&
                            <Alert variant="warning">
                                {notice}
                            </Alert>
                        }
                        <Form.Group controlId="loginEmail" className="mb-3"> {/* Updated controlId */}
                            <FloatingLabel
                                controlId="loginEmail"
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
                        <Form.Group controlId="loginPassword" className="mb-3"> {/* Updated controlId */}
                            <FloatingLabel
                                controlId="loginPassword"
                                label="Password"
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
                            <Button type="submit" className="btn-dark w-100 pt-3 pb-3" onClick={loginWithUsernameAndPassword}>
                                Submit
                            </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;