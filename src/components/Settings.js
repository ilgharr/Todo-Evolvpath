import React, {useEffect} from "react";

const Settings = ({currentUser, setIsLoggedIn}) => {
    // change email
    // change password
    // delete account

    // all of these need 2fa

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
                <button>Delete User</button>
                <button>Change username</button>
                <button>Change password</button>
            </div>
        </div>
    )

}

export default Settings;