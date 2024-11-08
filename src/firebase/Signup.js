import React, {useEffect, useState} from "react";
import { auth } from "./FirebaseConfig";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";

const Signup = ({setIsLoggedIn, setCurrentUser, currentUser}) => {
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
                setCurrentUser(auth.currentUser);
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
            if(currentUser) {
                await currentUser.reload();
                if(currentUser.emailVerified){
                    setIsLoggedIn(true);
                    setNotice("Email verified successfully. You are now logged in.");
                    clearInterval(intervalId);
                } else {
                    setNotice("Email not verified yet. Please check your inbox.");
                }
            }
        }

        if(currentUser && !currentUser.emailVerified){
            intervalId = setInterval(recheckVerification, 5000);
        }

        return () => clearInterval(intervalId);
    }, [currentUser, setIsLoggedIn]);

    return(
        <div className = "container">
            <div className="row justify-content-center">
                <form className="col-md-4 mt-3 pt-3 pb-3">
                    {"" !== notice &&
                        <div className="alert alert-warning" role="alert">
                            {notice}
                        </div>
                    }
                    <div className="form-floating mb-3">
                        <input id="signupEmail" type="email" className="form-control" aria-describedby="emailHelp"
                               placeholder="name@example.com" value={email}
                               onChange={(e) => setEmail(e.target.value)}></input>
                        <label htmlFor="signupEmail" className="form-label">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="signupPassword" type="password" className="form-control" placeholder="Password"
                               value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <label htmlFor="signupPassword" className="form-label">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="confirmPassword" type="password" className="form-control"
                               placeholder="Confirm Password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    </div>


                    <div className="d-grid">
                        <button type="submit" className="dark-button pt-3 pb-3"
                                onClick={(e) => signupWithUsernameAndPassword(e)}
                        >Submit
                        </button>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
