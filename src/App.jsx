import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import Login from './components/Login';
import md5 from 'md5'
import Retiro from './components/RetirarDinero';

const App = () => {
  const [login, setLogin] = useState();

  const navigate = useNavigate();
  const URL = 'http://127.0.0.1:8000/mi_api/'

  const getLogin = async (credenciales) => {
    try {
      const datos = await fetch(URL + 'login', {
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
          alert('Credenciales incorrectas');
          setLogin(false);
          window.location.reload(true);
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
      {login ? (
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/retiro" element={<Retiro />} />
          </Routes>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login getLogin={getLogin} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;