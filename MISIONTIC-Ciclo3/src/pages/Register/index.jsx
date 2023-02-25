import React, { useRef } from "react";
import { Link } from "react-router-dom";
import './register.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";

const Register = () => {
    const form = useRef(null);
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevoUsuario = {};
        fd.forEach((value, key) => {
            nuevoUsuario[key] = value;
        })
        const options = {
            method: 'POST',
            url: 'http://localhost:5001/userMaster/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: { user: nuevoUsuario.user, email: nuevoUsuario.email, password: nuevoUsuario.password, state: nuevoUsuario.state }
        };
        await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Usuario creado exitosamente");
            console.log(nuevoUsuario);
        }).catch(function (error) {
            console.error(error);
            toast.error("Error creando al usuario");
        });
    };
    return (
        <div className="register-screen">
            <div className="register-container">
                <div className="register-left">
                    <div className="register-title">
                        <h1>MISIONTIC</h1>
                        <h2>Hello World Team</h2>
                    </div>
                </div>
                <div className="register-right">
                    <div className="register-form">
                        <h1>Crear cuenta</h1>
                        <form ref={form} onSubmit={submitForm}>
                            <div className="group">
                                <input name="user" type="text" required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Usuario</label>
                            </div>
                            <div className="group">
                                <input name="email" type="email" required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Correo</label>
                            </div>
                            <div className="group">
                                <input name="password " type="password" required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Contraseña</label>
                            </div>
                            <div className="none" >
                                <input defaultValue="No definido" name="state" type="password" />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>State</label>
                            </div>
                            <div className="register-submit">
                                <input type="submit" value="Guardar usuario" />
                                <ToastContainer
                                    position="bottom-center"
                                    autoClose={5000}
                                />
                            </div>
                            <div className="others-text">
                                <Link className="link-text" to="/entrar">Iniciar sesion</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;
