import {Container, Alert, Col, Form, Row, Modal, Button, FloatingLabel} from "react-bootstrap";
import React, {useState} from "react";
import {deleteUser} from "firebase/auth";
import {auth} from "../firebase/FirebaseConfig";
import {writeUserTodos} from "../firebase/Database";

const PasswordField = ({currentPassword, setCurrentPassword}) => (
    <Col className="g-3 mb-3 align-items-end">
        <Form.Group>
            <FloatingLabel
                controlId="signupPassword"
                label="Password"
                className="mb-3"
            >
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
);

const DeleteAccount = ({authenticateUser, setIsLoggedIn}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [notice, setNotice] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const performAccountDeletion = async (currentUser) => {
        try {
            await deleteUser(currentUser);
        } catch (error) {
            setNotice(`${error.message}`);
        }
    };

    const handleAccountDelete = async (e) => {
        e.preventDefault();
        if (await authenticateUser(e, currentPassword)) {
            setIsAuthenticated(true);
            setShowConfirm(true);
        } else {
            setNotice('Authentication failed. Account deletion aborted.');
        }
    };

    const handleConfirmDelete = async () => {
        setShowConfirm(false);
        if (isAuthenticated) {
            const currentUser = auth.currentUser;
            await writeUserTodos(currentUser.uid, []);
            await performAccountDeletion(currentUser);
            setIsLoggedIn(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="8" className="mt-3 pt-3 pb-3">
                    <Form onSubmit={handleAccountDelete}>
                        {notice && (
                            <Alert variant="warning">
                                {notice}
                            </Alert>
                        )}
                        <PasswordField
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword}
                        />
                        <Col xs="auto">
                            <Button className="btn-dark pt-3 pb-3 w-100" type="submit">Delete Account</Button>
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
    );
};

export default DeleteAccount;