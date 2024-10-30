import LandingPage from "../components/LandingPage";
import React, {useEffect} from "react";
import DBManager from "./DBManager";

const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userId, setUserId] = React.useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            setUserId("");
        }
    }, [isLoggedIn]);

    return(
        <>
            {isLoggedIn ? <DBManager setIsLoggedIn={setIsLoggedIn} userId={userId} />
                : <LandingPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />}
        </>
    )
}

export default Authentication;

