import React, { useState } from "react";
import "./App.css";
import Corresponsal from "./components/Corresponsal";

const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías agregar la lógica para enviar los datos del formulario a tu servidor o hacer cualquier otra acción necesaria
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Usuario *</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={values.username}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label htmlFor="password">Contraseña *</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <br />
      <button className="btn-consultar" type="submit">
        Consultar
      </button>
    </form>
  );
};

function App() {
  return (
    <div>
      <Corresponsal />
      <LoginForm />
    </div>
  );
}

export default App;
