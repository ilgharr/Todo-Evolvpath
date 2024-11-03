import {Nav, Navbar} from "react-bootstrap";
import logo from "../assets/logo.png";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/FirebaseConfig";
import {logoutUser} from "../firebase/User"
const HomeNavbar =  ({setIsLoggedIn, displaySettings, setDisplaySettings}) => {

    const logoutUser = async (e) => {
        e.preventDefault();
        await signOut(auth);
        setIsLoggedIn(false);
    }

    return (
        <Navbar className="m-0 p-0" collapse="sm">
                <Navbar.Brand className="m-0 p-0 h-100">
                    <img className="logo-image" src={logo} alt="brand logo"/>
                </Navbar.Brand>

            <Navbar.Brand className="m-0 p-0">
                <h1 className="logo-text">EvolvPath</h1>
            </Navbar.Brand>

            <Nav className="ms-auto">
                <button
                    type="submit"
                    className="dark-button pt-3 pb-3 m-0 home-navbar-button"
                    onClick={(e) => logoutUser(e)}
                >Logout
                </button>
            </Nav>

            <Nav className="mx-4 my-0">
                <button
                    type="submit"
                    className="dark-button pt-3 pb-3 m-0 home-navbar-button"
                    onClick={() => setDisplaySettings((prevSetting) => !prevSetting)}
                >
                    {displaySettings ? 'Home' : 'Settings'}
                </button>
            </Nav>

        </Navbar>


    );
};

export default HomeNavbar;
