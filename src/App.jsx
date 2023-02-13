import React from 'react'
import { useEffect, useState } from "react";
import RetirarDinero from "./components/RetirarDinero";
import FormNuevaCuentaCorresponsal from "./components/FormNuevaCuentaCorresponsal";
import { Routes, Route, useNavigate, } from 'react-router-dom';
import Login from './components/Login';
import md5 from 'md5'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Historial } from './components/Historial';

const App = () => {
  const [login, setLogin] = useState();

  const navigate = useNavigate();

  const getLogin = async (credenciales) => {
    try {
      const datos = await fetch('http://127.0.0.1:8000/mi_api/loginCorresponsal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: credenciales.usuario,
          contrasena: md5(credenciales.contrasena),
        }),
      });
      if (datos.ok) {
        const data = await datos.json();
        if (data == 'error') {
          toast.error('Credenciales incorrectas', {
            position: toast.POSITION.TOP_RIGHT
          });
          setLogin(false);
        } else {
          setLogin(true);
          navigate('/retiro');
          localStorage.setItem('userLoginCorresponsal', true);
          localStorage.setItem('usuarioCorresponsal', credenciales.usuario);
        }
      }
    } catch (error) {
      console.log('El error es', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userLoginCorresponsal') == 'true') {
      navigate('/retiro');
      setLogin(true);
    } else {
      navigate('/');
      setLogin(false);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {login ? (
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/retiro" element={<RetirarDinero />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login getLogin={getLogin} />} />
            <Route path="/crear_corresponsal" element={<FormNuevaCuentaCorresponsal />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;