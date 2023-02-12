import { useState } from "react";
import "../styles/RetirarDinero.css";
import { Navbar } from '../layouts/Navbar'

function ValidationForm() {
  const [numeroCelular, setNumeroCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  function validateForm(e) {
    e.preventDefault()
  }

  return (
    <div>
      <Navbar />
      <form className="form-full-page" onSubmit={validateForm}>

        <div className="form-header">
        
        </div>
        <img
          className="img-retirar"
          src="/retirar-logo.png"
          alt="retiro"
        />
        <h3 className="info-text">Ingresa tú numero de celular</h3>
        <div className="form-body">
          <div className="form-group">
            <input
              type='number'
              name="num_cell"
              required
              value={numeroCelular}
              onChange={(e) => setNumeroCelular(e.target.value)}
              placeholder="Número de celular"
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type='number'
              name="codigo"
              required
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="****"
            />
          </div>
          {error && <p>{error}</p>}
        </div>
        <div className="form-footer">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  );
}

export default ValidationForm;
