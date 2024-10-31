import React, {useEffect} from "react";
import {changeTheme, getTheme, themeChangeListener} from "../firebase/Database";

const Settings = ({currentUser}) => {
    const [theme, setTheme] = React.useState(getTheme(currentUser.uid));
    // change theme
    // change email
    // change password
    // delete account

    useEffect(() => {
        if (theme === "dark") document.body.style.backgroundColor = 'gray';
        else document.body.style.backgroundColor = 'white';
        console.log(theme);
    }, [theme])

    const handleTheme = () => {
        if (theme === "light") setTheme("dark")
        else setTheme("light")
        changeTheme(currentUser.uid, theme);
    }

    return (
        <div className="settings">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: '#343a40'
            }}>
                <h1>SETTINGS COMING SOON!</h1>
                <strong>{currentUser.email}</strong>
                <button onClick={handleTheme}>Change Theme</button>
            </div>
        </div>
    )

}

export default Settings;