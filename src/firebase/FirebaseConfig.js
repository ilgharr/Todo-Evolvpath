import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";
import Config from "../Config"

// replace null with Config
const firebaseConfig = Config

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export {auth}

const database = getDatabase(app);
export { database };