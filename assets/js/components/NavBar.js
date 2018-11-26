import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../utils/Auth';


function NavBar(props) {

    const logOut = () => {
        auth0Client.logOut();
        props.history.replace('/');
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a href="#" className="navbar-brand"> Symfony React </a>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={"nav-link"} to={"/"}>
                            {
                                !auth0Client.isAuthenticated() &&
                                <button className="btn btn-dark" onClick={auth0Client.logIn}>Sign In</button>
                            }
                            {
                                auth0Client.isAuthenticated() &&
                                <div>
                                    <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                                    <button className="btn btn-dark" onClick={() => {logOut()}}>Sign Out</button>
                                </div>
                            }
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to={"/"}> Public Route </Link>
                    </li>

                    <li className="nav-item">
                        <Link className={"nav-link"} to={"/private"}> Protected Route </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default withRouter(NavBar);