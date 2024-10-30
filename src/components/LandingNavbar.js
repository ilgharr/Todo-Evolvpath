import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap';

// does not need to re-render, ever
const LandingNav = () => {
    return (
        <Navbar className="m-0 p-0" collapse="sm">
            {/*<LinkContainer className="m-0 p-0">*/}
                <Navbar.Brand className="m-0 p-0 h-100">
                    <img className="logo-image" src={logo} alt="brand logo"/>
                </Navbar.Brand>
            {/*</LinkContainer>*/}

            <Navbar.Brand  className="m-0 p-0">
                <h1 className="logo-text">EvolvPath</h1>
            </Navbar.Brand>
        </Navbar>
    );
};

export default React.memo(LandingNav);

//LinkContainer makes the component inside it a button that goes to "/"
//LinkContainer is used to create links in your navigation components that are styled with Bootstrap,
// while also enabling routing with React Router.
// It combines the styling of Bootstrap components with the
// navigation functionality of React Router.

//React.Children.only expected to receive a single React element child.

//Nav.Link is used to create clickable navigation links within your navbar.
// It doesn’t display the content of the routes directly;
// rather, it allows users to navigate to those routes.

/*
* Cats are territorial
* So, when a door gets shut, they feel as if their boundaries aren't being respected,
* which causes distress. If your cat usually runs the house,
* then they will consider your entire home to be their territory.
* When adding a barrier to your cat's space, it's common to see them become distraught.
* */

// testing testing



