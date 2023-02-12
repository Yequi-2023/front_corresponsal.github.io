import { useState } from "react";
import { Navbar } from "../layouts/Navbar";
// import Titulo from "../components/Titulo";
import "../styles/Login.css";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
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
  };

  return (
    <div>
      <Navbar />
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
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
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
    </div>
  );
};

export default Login;
