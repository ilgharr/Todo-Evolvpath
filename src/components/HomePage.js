import {getUserTodos, writeUserTodos} from "../firebase/Database";
import React, {useEffect, useState} from "react"
import HomeNavbar from "./HomeNavbar";
import Settings from "./Settings";
import Todo from "./Todo";

const HomePage = ({setIsLoggedIn, currentUser}) => {
    const [todos, setTodos] = useState([])
    const [displaySettings, setDisplaySettings] = useState(false);
    const [initialFetch, setInitialFetch] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            console.log("User ID is empty or invalid");
            setTodos([]);
            return;
        }
        getUserTodos(currentUser.uid).then((data) => {
            setTodos(data);
            setInitialFetch(false);  // Fetch is complete
        });
    }, [currentUser.uid]);

    useEffect(() => {
        if (initialFetch) return;
        writeUserTodos(currentUser.uid, todos);
    }, [todos, initialFetch]);

    return(
        <>
            <HomeNavbar setIsLoggedIn={setIsLoggedIn} displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
            <div className="d-grid">
                {displaySettings ? <Settings currentUser={currentUser} setIsLoggedIn={setIsLoggedIn}/> : <Todo todos={todos} setTodos={setTodos}/>}
            </div>
        </>
    )
}

export default HomePage;