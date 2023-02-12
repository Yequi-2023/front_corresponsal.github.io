import React from 'react'
import { useState } from 'react'
import { Navbar } from '../layouts/Navbar'

const Login = ({ getLogin }) => {
    const [loginData, setLoginData] = useState({
        usuario: '',
        contrasena: '',
    });
    const dataLogin = (e) => {
        let value = e.target.value;
        if (e.target.name === 'usuario') {
            value = e.target.value.replace(/\D/g, '');
        }
        if (e.target.name === 'contrasena') {
            value = e.target.value.replace(/\D/g, '');
        }
        setLoginData({ ...loginData, [e.target.name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form className="form-full-page" onSubmit={handleSubmit}>
                <h1>CORRESPONSAL</h1>
                <div>
                    <label htmlFor="username">
                        <span className="user">Usuario</span>{" "}
                        <span className="char">*</span> <br />
                    </label>
                    <br />
                    <input
                        type="text"
                        name="usuario"
                        onChange={dataLogin}
                        value={loginData.usuario}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="password">
                        <span className="passworduser">Contraseña</span>
                        <span className="char">*</span> <br />
                    </label>
                    <br />
                    <input
                        type="password"
                        name="contrasena"
                        id="password"
                        onChange={dataLogin}
                        value={loginData.contrasena}
                    />
                </div>
                <br />
                <button className="btn-consultar" onClick={(e) => getLogin(loginData)} >
                    Consultar
                </button>
            </form>
        </div>
    )
}
export default Login

