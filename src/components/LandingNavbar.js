import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png'

// does not need to re-render, ever
const LandingNav = () => {
    return (
        <Navbar className="m-0 p-0" collapse="sm">
                <Navbar.Brand className="m-0 p-0 h-100">
                    <img className="logo-image" src={logo} alt="brand logo"/>
                </Navbar.Brand>
            <Navbar.Brand  className="m-0 p-0">
                <h1 className="logo-text">EvolvPath</h1>
            </Navbar.Brand>
        </Navbar>
    );
};

export default React.memo(LandingNav);

/*
* Cats are territorial
* So, when a door gets shut, they feel as if their boundaries aren't being respected,
* which causes distress. If your cat usually runs the house,
* then they will consider your entire home to be their territory.
* When adding a barrier to your cat's space, it's common to see them become distraught.
* */

// testing testing



