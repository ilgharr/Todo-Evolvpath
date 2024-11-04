import React, {useState} from "react";
import { auth } from "./FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({setIsLoggedIn, setCurrentUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if(auth.currentUser.emailVerified){
                setIsLoggedIn(true);
                setCurrentUser(auth.currentUser);
            } else {
                setNotice("Your email address is not verified. Please check your inbox.");
            }
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    }

    return(
        <div className = "container">
            <div className = "row justify-content-center">
                <form className = "col-md-4 mt-3 pt-3 pb-3">
                    { "" !== notice &&
                        <div className = "alert alert-warning" role = "alert">
                            { notice }    
                        </div>
                    }                  
                    <div className = "form-floating mb-3">
                        <input
                            type = "email"
                            className = "form-control"
                            id = "exampleInputEmail1"
                            aria-describedby = "emailHelp"
                            placeholder = "name@example.com"
                            value = { email }
                            onChange = { (e) => setEmail(e.target.value) }>
                        </input>

                        <label htmlFor = "exampleInputEmail1" className = "form-label">Email</label>
                    </div>
                    <div className = "form-floating mb-3">
                        <input
                            type = "password"
                            className = "form-control"
                            id = "exampleInputPassword1"
                            placeholder = "Password"
                            value = { password }
                            onChange = { (e) => setPassword(e.target.value) }></input>
                        <label htmlFor = "exampleInputPassword1" className = "form-label">Password</label>
                    </div>
                    <div className = "d-grid">
                        <button type = "submit" className = "dark-button pt-3 pb-3"
                                onClick = {(e) => loginWithUsernameAndPassword(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
