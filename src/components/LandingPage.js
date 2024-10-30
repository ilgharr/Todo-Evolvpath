import React, {useState} from 'react';
import LandingNavbar from './LandingNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../authentication/Login';
import Signup from '../authentication/Signup';
import SwitchSelector from "react-switch-selector";

const LandingPage = ({setIsLoggedIn, setUserId}) => {
    const [displayLogin, setDisplayLogin] = useState(true);

    const handleLoginSignup = () => {
        setDisplayLogin(!displayLogin);
    }

    const options = [
        {
            label: "LOGIN",
            value: "login",
            selectedBackgroundColor: "#404040",
        },
        {
            label: "SIGN UP",
            value: "signup",
            selectedBackgroundColor: "#404040",
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
                {displayLogin ? <Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/> : <Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>}
            </div>
        </div>
    );
};

export default LandingPage