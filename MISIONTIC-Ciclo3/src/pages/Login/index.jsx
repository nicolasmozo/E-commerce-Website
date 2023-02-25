import React from "react";
import { Link } from 'react-router-dom';
import './login.css';
const Login = () => (
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
                    <h1>Iniciar sesion</h1>
                    <form>
                        <div className="group">
                            <input type="email" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Correo</label>
                        </div>
                        <div className="group">
                            <input type="password" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Contraseña</label>
                        </div>
                        <div className="login-submit">
                            <input type="submit" value="Entrar" />
                        </div>
                        <div className="others-text">
                            <div>
                                <Link className="link-text-left" to="/">Olvide mi contraseña</Link>
                            </div>
                            <div>
                                <Link className="link-text-right" to="/registro">Crear cuenta</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)
export default Login;