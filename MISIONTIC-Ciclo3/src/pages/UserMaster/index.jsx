import axios from "axios";
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './userMaster.css';
import { useAuth0 } from "@auth0/auth0-react";

export const UserMaster = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    useEffect(()=>{
        const obtenerUsuarios = async () => {
            const options = {
                method: 'GET',
                url: 'https://quiet-ridge-43761.herokuapp.com/userMaster',
                headers: { 'Content-Type': 'application/json' }
            };
            await axios.request(options).then(function (response) {
                setUsuarios(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        };
        if (ejecutarConsulta){
            obtenerUsuarios();
            setEjecutarConsulta(false);
        }
    },[ejecutarConsulta]);
    return (
        <div className="login-screen">
            <div className="login-container">
                
                <div className="login-right">
                    <div className="login-form">
                        <TablaDeUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
                    </div>
                </div>
            </div>
        </div>
    )
}
const RowsTable = ({ usuarios, setEjecutarConsulta}) => {
    const [edit, setEdit] = useState(false);
    const [infoNuevoUsuario, setinfoNuevoUsuario] = useState({
        user: usuarios.user,
        emaillue: usuarios.email,
        state: usuarios.state
    });
    const actualizarProducto = async () => {
        const options = {
            method: 'PATCH',
            url: 'https://quiet-ridge-43761.herokuapp.com/userMaster/editar',
            headers: { 'Content-Type': 'application/json' },
            data: { ...infoNuevoUsuario, id: usuarios._id }
        };
        await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Usuario editado exitosamente");
            setEdit(!edit);
            setEjecutarConsulta(true);
        }).catch(function (error) {
            console.error(error);
            toast.error("Error al editar");
        });
    };
    const elimintarProducto  = async () => {
        const options = {
            method: 'DELETE',
            url: 'https://quiet-ridge-43761.herokuapp.com/userMaster/eliminar',
            headers: { 'Content-Type': 'application/json' },
            data: { id: usuarios._id }
        };
        await axios.request(options).then(function (response) {
            console.log(response.data);
            setEjecutarConsulta(true);
            toast.success("Usuario eliminado con exito");
        }).catch(function (error) {
            console.error(error);
            toast.error("Error al eliminar el usuario");
        });
    };
    return (
        < tr  >
            {edit ? (
                <>
                    <td>{usuarios._id.substr(-4)}</td>
                    <td>
                        <input type="text" value={infoNuevoUsuario.user} onChange={(e) => setinfoNuevoUsuario({ ...infoNuevoUsuario, user: e.target.value })} />
                    </td>
                    <td>
                        <input type="text" value={infoNuevoUsuario.email} onChange={(e) => setinfoNuevoUsuario({ ...infoNuevoUsuario, email: e.target.value })} />
                    </td>
                    <td>
                        <input type="text" value={infoNuevoUsuario.state} onChange={(e) => setinfoNuevoUsuario({ ...infoNuevoUsuario, state: e.target.value })} />
                    </td>
                </>
            ) : (
                <>
                    <td>{usuarios._id.substr(-4)}</td>
                    <td>{usuarios.user}</td>
                    <td>{usuarios.email}</td>
                    <td >{usuarios.state}</td>
                </>
            )}
            <td className="actions">
                {edit ? (
                    <>
                        <i onClick={() => actualizarProducto()} className="fas fa-check actions" />
                    </>
                ) : (
                    <>
                        <i onClick={() => setEdit(!edit)} className="fas fa-edit actions" />
                        <i onClick={() => elimintarProducto()} className="fas fa-trash-alt actions" />
                        <ToastContainer position="bottom-center" autoClose={5000} />
                    </>
                )}
            </td>
        </tr >
    )
}
const TablaDeUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => { 
    const { logout } = useAuth0();
    return (
        <div>
            <h2 className="title"> Tabla de usuarios</h2>
            <div>
                <div className="busqueda">
                    <input  placeholder="Busqueda" className="busqueda-in"></input>
                </div>
                <table className="table">
                    <thead>
                        <tr className="table">
                            <th  >Identificador</th>
                            <th >Usuario</th>
                            <th >Correo</th>
                            <th >Estado</th>
                            <th >Editar / Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaUsuarios.map((usuarios) => {
                            return (
                                <RowsTable key={nanoid()} usuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
                            );
                        })}
                    </tbody>
                </table>
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
            </div>
        </div>
    )
}
export default UserMaster