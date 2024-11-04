import LandingPage from "../components/LandingPage";
import React, {useEffect} from "react";
import HomePage from "../components/HomePage";

const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            setCurrentUser("");
        }
    }, [isLoggedIn]);

    return(
        <>
            {isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                : <LandingPage setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser}/>}
        </>
    )
}

export default Authentication;

