import React, {useState} from 'react';
import LandingNavbar from './LandingNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../firebase/Login';
import Signup from '../firebase/Signup';
import SwitchSelector from "react-switch-selector";

const LandingPage = ({setIsLoggedIn}) => {
    const [displayLogin, setDisplayLogin] = useState(true);

    const handleLoginSignup = () => {
        setDisplayLogin(!displayLogin);
    }

    const options = [
        {
            label: "LOGIN",
            value: "login",
            selectedBackgroundColor: "#000000",
        },
        {
            label: "SIGN UP",
            value: "signup",
            selectedBackgroundColor: "#000000",
        }
    ];

    return (
        <div>
            <LandingNavbar/>
            <div className="login_container">
                <SwitchSelector
                    options={options}
                    onChange={handleLoginSignup}
                    fontSize={20}
                    border={"solid"}
                />
            </div>

            <div className = "d-grid">
                {displayLogin ? <Login setIsLoggedIn={setIsLoggedIn}/> : <Signup setIsLoggedIn={setIsLoggedIn}/>}
            </div>
        </div>
    );
};

export default LandingPage