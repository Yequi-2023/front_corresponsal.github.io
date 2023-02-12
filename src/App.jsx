import React from 'react'
import Login from "./components/Login";
import RetirarDinero from "./components/RetirarDinero";
import { Routes, Route, useNavigate, } from 'react-router-dom';

const App = () => {
    return (
        <>
            {
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/retirardinero" element={<RetirarDinero />} />
                </Routes>
            }
        </>
    )
}

export default App