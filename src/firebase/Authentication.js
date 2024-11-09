import LandingPage from "../components/LandingPage";
import React, {useEffect} from "react";
import HomePage from "../components/HomePage";

const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return(
        <>
            {isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn}/>
                : <LandingPage setIsLoggedIn={setIsLoggedIn}/>}
        </>
    )
}

export default Authentication;

