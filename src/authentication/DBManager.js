import {database} from "./Firebase";
import {ref, set, child, get} from "firebase/database"
import React, {useEffect, useState} from "react"
import HomeNavbar from "../components/HomeNavbar";
import Settings from "../components/Settings";
import Todo from "../components/Todo";

const writeUserTodos = (uid, todos) => {
    set(ref(database, 'users/' + uid), {
        todos: todos.length === 0 ? [] : todos
    });
}

const getUserTodos = async (uid) => {
    if (!uid) {
        console.log("Invalid user ID");
        return [];
    }

    const dbRef = ref(database);

    try {
        const snapshot = await get(child(dbRef, `users/${uid}`));
        if (snapshot.exists()) {
            return snapshot.val().todos || [];
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

const DBManager = ({setIsLoggedIn, userId}) => {
    const [todos, setTodos] = useState([])
    const [displaySettings, setDisplaySettings] = useState(false);
    const [initialFetch, setInitialFetch] = useState(true);

    useEffect(() => {
        if (!userId) {
            console.log("User ID is empty or invalid");
            setTodos([]);
            return;
        }
        getUserTodos(userId).then((data) => {
            setTodos(data);
            setInitialFetch(false);  // Fetch is complete
        });
    }, [userId]);

    useEffect(() => {
        if (initialFetch) return;
        writeUserTodos(userId, todos);
    }, [todos, initialFetch]);

    return(
        <>
            <HomeNavbar setIsLoggedIn={setIsLoggedIn} displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
            <div className="d-grid">
                {displaySettings ? <Settings /> : <Todo todos={todos} setTodos={setTodos}/>}
            </div>
        </>
    )
}

export default DBManager;