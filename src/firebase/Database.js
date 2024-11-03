import {child, get, ref, update, set, onValue} from "firebase/database";
import {doc, onSnapshot} from "firebase/firestore"
import {database} from "./FirebaseConfig";

const initiateUser = (uid) => {
    set(ref(database, `users/` + uid), {
        todos: null,
        settings: {
            theme: "light",
        }
    });
}

const writeUserTodos = (uid, todos) => {
    update(ref(database, `users/` + uid), {
        todos: todos.length === 0 ? [{isDone: false, text: ""}] : todos
    });
}

const getUserTodos = async (uid) => {
    if (!uid) {
        console.log("Invalid user ID");
        return [];
    }
    const dbRef = ref(database);
    try {
        const snapshot = await get(child(dbRef, `users/${uid}/`));
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



export {getUserTodos, writeUserTodos, initiateUser}











const changeTheme = (uid, themeMode) => {
    update(ref(database, `users/` + uid + "/settings"), {
        theme: themeMode
    });
}

const getTheme = async (uid) => {
    if (!uid) {
        console.log("Invalid user ID");
        return [];
    }
    const dbRef = ref(database);
    try {
        const snapshot = await get(child(dbRef, `users/${uid}/`));
        if (snapshot.exists()) {
            return snapshot.val().settings.theme || [];
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

const themeChangeListener = (uid) => {
    const themeRef = ref(database, 'users/' + uid + '/theme');

    // Set up the listener for changes to the theme
    onValue(themeRef, (snapshot) => {
        return snapshot.val();
    }, {
        onlyOnce: false // Continuously listen for changes
    });
    return ""
};