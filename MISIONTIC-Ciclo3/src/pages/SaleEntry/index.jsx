import axios from "axios";
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './saleEntry.css';
import { nanoid } from 'nanoid';
import { useAuth0 } from "@auth0/auth0-react";



const SaleEntry = () => {


    return (

        <div className="login-screen">
            <div className="login-container">


                <div className="login-right">
                    <div className="login-form">
                        <TablaPrincipal />
                    </div>
                </div>
            </div>
        </div>
    )
}

const TablaPrincipal = () => {

    const form = useRef(null);
    const submitVentas = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;

        })
        const options = {
            method: 'POST',
            url: 'https://quiet-ridge-43761.herokuapp.com/saleMaster/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: {
                date: nuevaVenta.date,
                value: nuevaVenta.value,
                product: nuevaVenta.product,
                vendedor: nuevaVenta.vendedor,
                clientID: nuevaVenta.clientID
            }
        };

        await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Venta creado exitosamente");
            console.log(nuevaVenta);
        }).catch(function (error) {
            console.error(error);
            toast.error("Error creando venta");
        });
    };

    const [productos, setProductos] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(() => {
        const obtenerProductos = async () => {

            const options = {
                method: 'GET',
                url: 'https://quiet-ridge-43761.herokuapp.com/productMaster',
                headers: { 'Content-Type': 'application/json' }
            };

            await axios.request(options).then(function (response) {
                setProductos(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        };
        if (ejecutarConsulta) {
            obtenerProductos();
            setEjecutarConsulta(false);

        }
    }, []);

    const [empleados, setEmpleados] = useState([]);
    useEffect(() => {
        const obtenerEmpleados = async () => {

            const options = {
                method: 'GET',
                url: 'https://quiet-ridge-43761.herokuapp.com/employeeMaster',
                headers: { 'Content-Type': 'application/json' }
            };

            await axios.request(options).then(function (response) {
                setEmpleados(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        };
        if (ejecutarConsulta) {
            obtenerEmpleados();
            setEjecutarConsulta(false);

        }
    }, []);
    const { logout } = useAuth0();
    return (

        <div >
            <h2 className="title" >Registro de ventas</h2>
            <form ref={form} onSubmit={submitVentas}>


                <div className="group-n">
                    <input name="description" type="date" required />
                    <span className="highlight"></span>
                    <span className="bar" ></span>
                    <p>Fecha de la venta</p>
                </div>
                <div className="group-n">
                    <input name="value" type="number" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <p>Valor unitario</p>
                </div>
                Seleccione productos vendidos
                * Use la tecla control para varios

                <div className="checkbox" >
                    <select name="productos" multiple id="dropdown" >
                        {productos.map((v) => {
                            return <option onClick={() => console.log(v.value)} key={nanoid()}>{v.description}{" - "}{v.value}{" - "}{v.state}</option>
                        })}
                    </select>

                </div>
                Seleccione vendedor
                <div className="checkbox" >
                    <select name="empleados" id="dropdown" >
                        {empleados.map((v) => {
                            return <option onClick={() => console.log(v.value)} key={nanoid()}>{v.description}{" - "}{v.value}{" - "}{v.state}</option>
                        })}
                    </select>

                </div>
                <div className="group">
                    <input type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    Nombre del cliente
                </div>
                <div className="group">
                    <input type="number" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    Documento de identificación del cliente
                </div>
                <div className="login-submit">
                    <input className="checkbox-bottom" id="checkbox-bottom" type="submit" value="Guardar venta" />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                    />
                </div>
                <h3>Interfaces</h3>
                <div >

                    <div className="foot">
                        <Link to="./saleEntry">Registro de ventas</Link>{" ------- "}
                        <Link to="./saleMaster">Maestro de ventas</Link>{" ------- "}
                        <Link to="./productEntry">Registro de productos</Link>{" ------- "}
                        <Link to="./productMaster">Maestro de productos</Link>{" ------- "}
                        <Link to="./userMaster">Maestro de usuarios</Link>{" ------- "}
                        <button onClick={() => logout({  returnTo: "https://powerful-citadel-56456.herokuapp.com/landingPage"})}>Cerrar sesión</button>
                    </div>
                    
                </div>
            </form>
        </div>

    )
}
export default SaleEntry;
