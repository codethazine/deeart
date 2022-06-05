import React from "react";
// import { useDispatch } from 'react-redux';
import LoginButton from "components/loginButton/loginButton";
import logo from 'assets/logo.svg';
import './Navbar.scss';

const Navbar = () => {

    return (
        <div className="dee_navbar_container">
            <div><img src={logo} alt='logo' /> Logo</div>
            <div>
                <div>discover</div>
                <div><LoginButton/></div>
            </div>
        </div>
    )
}

export default Navbar;