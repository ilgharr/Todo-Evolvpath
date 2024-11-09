import {Nav, Navbar, Button} from "react-bootstrap";
import logo from "../assets/logo.png";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/FirebaseConfig";

const HomeNavbar = ({setIsLoggedIn, displaySettings, setDisplaySettings}) => {

    const handleLogout = async (e) => {
        e.preventDefault();
        await signOut(auth);
        setIsLoggedIn(false);
    };

    const handleToggleSettings = () => {
        setDisplaySettings(prevSetting => !prevSetting);
    };

    return (
        <Navbar className="m-0 p-0">
            <Navbar.Brand className="m-0 p-0 h-100">
                <img className="logo-image" src={logo} alt="brand logo"/>
            </Navbar.Brand>
            <Navbar.Brand className="m-0 p-0">
                <h1 className="logo-text">EvolvPath</h1>
            </Navbar.Brand>
            <Nav className="ms-auto">
                <Button
                    type="submit"
                    className="btn-dark pt-3 pb-3"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Nav>
            <Nav className="mx-4 my-0">
                <Button
                    type="submit"
                    className="btn-dark pt-3 pb-3"
                    onClick={handleToggleSettings}
                >
                    {displaySettings ? 'Home' : 'Settings'}
                </Button>
            </Nav>
        </Navbar>
    );
};

export default HomeNavbar;