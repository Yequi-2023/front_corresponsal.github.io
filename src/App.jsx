import React from 'react'
import Login from "./components/Login";
import RetirarDinero from "./components/RetirarDinero";
import FormNuevaCuentaCorresponsal from "./components/FormNuevaCuentaCorresponsal";
import { Routes, Route, useNavigate, } from 'react-router-dom';

const App = () => {
    return (
        <>
            {
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/retirardinero" element={<RetirarDinero />} />
                    <Route path="/crear_corresponsal" element={<FormNuevaCuentaCorresponsal />} />
                </Routes>
            }
        </>
    )
}

export default App