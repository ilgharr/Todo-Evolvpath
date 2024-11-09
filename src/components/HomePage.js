import {getUserTodos, writeUserTodos} from "../firebase/Database";
import React, {useEffect, useState} from "react"
import HomeNavbar from "./HomeNavbar";
import Settings from "./Settings";
import Todo from "./Todo";
import {auth} from "../firebase/FirebaseConfig";

const HomePage = ({setIsLoggedIn}) => {
    const [todos, setTodos] = useState([])
    const [displaySettings, setDisplaySettings] = useState(false);
    const [initialFetch, setInitialFetch] = useState(true);

    useEffect(() => {
        if (!auth.currentUser) {
            console.log("User ID is empty or invalid");
            setTodos([]);
            return;
        }
        getUserTodos(auth.currentUser.uid).then((data) => {
            setTodos(data);
            setInitialFetch(false);  // Fetch is complete
        });
    }, [auth.currentUser.uid]);

    useEffect(() => {
        if (initialFetch) return;
        writeUserTodos(auth.currentUser.uid, todos);
    }, [todos, initialFetch]);

    return(
        <>
            <HomeNavbar setIsLoggedIn={setIsLoggedIn} displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
            <div className="d-grid">
                {displaySettings ? <Settings setIsLoggedIn={setIsLoggedIn}/> : <Todo todos={todos} setTodos={setTodos}/>}
            </div>
        </>
    )
}

export default HomePage;