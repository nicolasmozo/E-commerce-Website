import axios from "axios";
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './productEntry.css';

import { useAuth0 } from "@auth0/auth0-react";
const ProductEntry = () => {
    return (
        <div className="login-screen">
            <div className="login-container">

                <div className="login-right">
                    <div className="login-form">
                        <Formulario />
                    </div>
                </div>
            </div>
        </div>
    )
}
const Formulario = () => {
    const form = useRef(null);
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        })
        const options = {
            method: 'POST',
            url: 'https://quiet-ridge-43761.herokuapp.com/productMaster/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: { description: nuevoProducto.description, value: nuevoProducto.value, state: nuevoProducto.state }
        };
        await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Producto creado exitosamente");
            console.log(nuevoProducto);
        }).catch(function (error) {
            console.error(error);
            toast.error("Error creando producto");
        });
    };
    const { logout } = useAuth0();
    return (
        <div >
            <h1>Registro de productos</h1>
            <form ref={form} onSubmit={submitForm}>
                <div className="group-n">
                    <input name="description" type="text" required />
                    <span className="highlight"></span>
                    <span className="bar" ></span>
                    <p>Descripción del producto</p>
                </div>
                <div className="group-n">
                    <input name="value" type="number" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <p>Valor unitario</p>
                </div>
                <div href="estado " className="checkbox" >
                    <select name="state" required>
                        <option disabled>Seleccione disponibilidad</option>
                        <option >Disponible</option>
                        <option >No Disponible</option>
                    </select>
                </div>
                <div className="login-submit">
                    <input className="checkbox-bottom" id="checkbox-bottom" type="submit" value="Guardar producto" />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                    />
                </div>
                <div className="others">
                    <div className="foot">
                        <Link to="./saleEntry">Registro de ventas</Link>{" ------- "}
                        <Link to="./saleMaster">Maestro de ventas</Link>{" ------- "}
                        <Link to="./productEntry">Registro de productos</Link>{" ------- "}
                        <Link to="./productMaster">Maestro de productos</Link>{" ------- "}
                        <Link to="./userMaster">Maestro de usuarios</Link>{" ------- "}
                        <button onClick={() => logout({ returnTo: "https://powerful-citadel-56456.herokuapp.com/landingPage" })}>Cerrar sesión</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ProductEntry
