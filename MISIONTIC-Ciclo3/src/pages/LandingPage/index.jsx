import React from "react";
import { Link } from 'react-router-dom';
import './landingPage.css'
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login-screen">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-title">
                        <h1>MISIONTIC</h1>
                        <h2>Hello World Team</h2>
                    </div>
                </div>
                <div className="login-right">
                    <div className="login-form">
                        <h1>Bienvenido/a </h1>
                        <form>

                            <div className="login-submit">

                                <input onClick={() => loginWithRedirect()} type="submit" value="Inicir sesión" />

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPage;