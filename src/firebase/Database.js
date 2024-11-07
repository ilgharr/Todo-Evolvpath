import {child, get, ref, update, set, onValue} from "firebase/database";
import {database} from "./FirebaseConfig";

const writeUserTodos = (uid, todos) => {
    update(ref(database, `users/` + uid), {
        todos: todos.length === 0 ? [{}] : todos
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

export {getUserTodos, writeUserTodos}