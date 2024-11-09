import LandingPage from "../components/LandingPage";
import HomePage from "../components/HomePage";
import React, {useState, useEffect} from "react";

const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return(
        <>
            {isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn}/>
                : <LandingPage setIsLoggedIn={setIsLoggedIn}/>}
        </>
    );
};

export default Authentication;

