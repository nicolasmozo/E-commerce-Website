import axios from "axios";
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './spr.css';
import { useAuth0 } from "@auth0/auth0-react";

export const SaleMaster = () => {
    const [sales, setSales] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    useEffect(() => {
        const obtenerSales = async () => {
            const options = {
                method: 'GET',
                url: 'https://quiet-ridge-43761.herokuapp.com/saleMaster',
                headers: { 'Content-Type': 'application/json' }
            };
            await axios.request(options).then(function (response) {
                setSales(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        };
        if (ejecutarConsulta) {
            obtenerSales();
            setEjecutarConsulta(false);
        }
    }, [ejecutarConsulta]);
    return (
        <div className="login-screen">
            <div className="login-container">
                
                <div className="login-right">
                    <div className="login-form">
                        <TablaProductos listaSales={sales} setEjecutarConsulta={setEjecutarConsulta} />
                    </div>
                </div>
            </div>
        </div>
    )
}
const RowsTable = ({ sales, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        description: sales.description,
        value: sales.value,
        state: sales.state
    });
    const actualizarVenta = async () => {
        const options = {
            method: 'PATCH',
            url: 'https://quiet-ridge-43761.herokuapp.com/saleMaster/editar',
            headers: { 'Content-Type': 'application/json' },
            data: { ...infoNuevaVenta, id: sales._id }
        };
        await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Venta editada exitosamente");
            setEdit(!edit);
            setEjecutarConsulta(true);
        }).catch(function (error) {
            console.error(error);
            toast.error("Error al editar");
        });
    };
    const eliminarVenta = async () => {
        const options = {
            method: 'DELETE',
            url: 'https://quiet-ridge-43761.herokuapp.com/saleMaster/eliminar',
            headers: { 'Content-Type': 'application/json' },
            data: { id: sales._id }
        };
        await axios.request(options).then(function (response) {
            console.log(response.data);
            setEjecutarConsulta(true);
            toast.success("Venta eliminada con exito");
        }).catch(function (error) {
            console.error(error);
            toast.error("Error al eliminar la venta");
        });
    };
    return (
        < tr  >
            {edit ? (
                <>
                    <td>{sales._id.substr(-4)}</td>
                    <td>
                        <input type="text" value={infoNuevaVenta.date} onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, date: e.target.value })} />
                    </td>
                    <td>
                        <input type="text" value={infoNuevaVenta.value} onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, value: e.target.value })} />
                    </td>
                    <td>
                        <input type="text" value={infoNuevaVenta.products} onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, products: e.target.value })} />
                    </td>
                    <td>
                        <input type="text" value={infoNuevaVenta.employee} onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, employee: e.target.value })} />
                    </td>
                    <td>
                        <input type="text" value={infoNuevaVenta.client} onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, client: e.target.value })} />
                    </td>
                    <td>
                        <input type="text" value={infoNuevaVenta.clientID} onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, clientID: e.target.value })} />
                    </td>
                </>
            ) : (
                <>
                    <td>{sales._id.substr(-4)}</td>
                    <td>{sales.date}</td>
                    <td>{sales.value}</td>
                    <td>{sales.products}</td>
                    <td>{sales.employee}</td>
                    <td>{sales.client}</td>
                    <td>{sales.clientID}</td>
                </>
            )}
            <td className="actions">
                {edit ? (
                    <>
                        <i onClick={() => actualizarVenta()} className="fas fa-check actions" />
                    </>
                ) : (
                    <>
                        <i onClick={() => setEdit(!edit)} className="fas fa-edit actions" />
                        <i onClick={() => eliminarVenta()} className="fas fa-trash-alt actions" />
                        <ToastContainer position="bottom-center" autoClose={5000} />
                    </>
                )}
            </td>
        </tr >
    )
}
const TablaProductos = ({ listaSales, setEjecutarConsulta }) => {
    const { logout } = useAuth0();

    return (
        <div>
            <h2 className="title"> Maestro de ventas</h2>
            <div>
                <div className="busqueda">
                    <input placeholder="Busqueda" className="busqueda-in"></input>
                </div>
                <table className="table">
                    <thead>
                        <tr className="table">
                            <th  >ID</th>
                            <th >Fecha</th>
                            <th >Valor Unitario</th>
                            <th >Productos vendidos</th>
                            <th >Vendedor</th>
                            <th >Cliente</th>
                            <th >ID Cliente</th>
                            <th >Editar / Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaSales.map((sales) => {
                            return (
                                <>
                                    <RowsTable key={nanoid()} sales={sales} setEjecutarConsulta={setEjecutarConsulta} />
                                    <ToastContainer
                                        position="bottom-center"
                                        autoClose={5000}
                                    />
                                </>
                            );
                        })}
                    </tbody>
                </table>
                <div className="foot">
                <div>
                        <Link to="./saleEntry">Registro de ventas</Link>{" ------- "}
                        <Link to="./saleMaster">Maestro de ventas</Link>{" ------- "}
                        <Link to="./productEntry">Registro de productos</Link>{" ------- "}
                        <Link to="./productMaster">Maestro de productos</Link>{" ------- "}
                        <Link to="./userMaster">Maestro de usuarios</Link>{" ------- "}
                        <button onClick={() => logout({  returnTo: "https://powerful-citadel-56456.herokuapp.com/landingPage"})}>Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SaleMaster;