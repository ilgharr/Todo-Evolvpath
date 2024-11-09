import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingNavbar from './LandingNavbar';
import Login from '../firebase/Login';
import Signup from '../firebase/Signup';
import SwitchSelector from "react-switch-selector";

const getSwitchSelectorOptions = () => [
    {
        label: "LOGIN",
        value: "login",
        selectedBackgroundColor: "#000000",
    },
    {
        label: "SIGN UP",
        value: "signup",
        selectedBackgroundColor: "#000000",
    },
];

// Function to render the form based on the displayLogin flag
const renderAuthForm = (displayLogin, setIsLoggedIn) => (
    displayLogin
        ? <Login setIsLoggedIn={setIsLoggedIn}/>
        : <Signup setIsLoggedIn={setIsLoggedIn}/>
);

const LandingPage = ({setIsLoggedIn}) => {
    const [isLoginDisplayed, setIsLoginDisplayed] = useState(true);

    const toggleLoginSignup = () => {
        setIsLoginDisplayed(!isLoginDisplayed);
    };

    return (
        <div>
            <LandingNavbar/>
            <div className="login_container">
                <SwitchSelector
                    options={getSwitchSelectorOptions()}
                    onChange={toggleLoginSignup}
                    fontSize={20}
                    border="solid"
                />
            </div>
            <div className="d-grid">
                {renderAuthForm(isLoginDisplayed, setIsLoggedIn)}
            </div>
        </div>
    );
};

export default LandingPage;