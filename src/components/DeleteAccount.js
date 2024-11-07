import {Container, Alert, Col, Form, Row, Modal, Button} from "react-bootstrap";
import React, {useState} from "react";
import {deleteUser} from "firebase/auth";
import {auth} from "../firebase/FirebaseConfig";
import {writeUserTodos} from "../firebase/Database";

const DeleteAccount = ({authenticateUser, setIsLoggedIn}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [notice, setNotice] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const deleteAccountProcess = async (auth) => {
        try {
            await deleteUser(auth.currentUser);
        } catch (error) {
            setNotice(`${error.message}`);
        }
    }

    const handleAccountDelete = async (e) => {
        e.preventDefault();
        const isAuth = await authenticateUser(e, currentPassword);
        setIsAuthenticated(isAuth);

        if (isAuth) {
            setShowConfirm(true);
        } else {
            setNotice('Authentication failed. Account deletion aborted.');
        }
    }

    const handleConfirmDelete = async () => {
        setShowConfirm(false);
        if (isAuthenticated) {
            await writeUserTodos(auth.currentUser.uid, [])
            await deleteAccountProcess(auth);
            setIsLoggedIn(false);

        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="mt-3 pt-3 pb-3">
                    <Form onSubmit={handleAccountDelete}>
                        {notice && (
                            <Alert variant="warning">
                                {notice}
                            </Alert>
                        )}
                            <Col className="g-3 mb-3 align-items-end">
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
                                <button className="dark-button pt-3 pb-3 w-100" type="submit">Delete Account</button>
                            </Col>
                    </Form>
                </Col>
            </Row>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Account Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default DeleteAccount;