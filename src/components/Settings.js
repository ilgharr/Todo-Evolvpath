import {auth} from "../authentication/Firebase";
import _404_ from "./_404_";
import React from "react";


const Settings = () => {
    if (!auth.currentUser) {return <_404_/>}

    const handleTheme = () => {

    }

    return (
        <div className="settings">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f8f9fa',
                color: '#343a40'
            }}>
                <h1>SETTINGS COMING SOON!</h1>
            </div>
        </div>
    )

}

export default Settings;