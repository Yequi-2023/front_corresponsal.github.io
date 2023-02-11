import { useState } from "react";
import Titulo from "../components/Titulo";
import "./RetirarDinero.css";

function ValidationForm() {
  const [numeroCelular, setNumeroCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    if (numeroCelular.length !== 10) {
      setError("El número de celular debe tener 10 dígitos.");
      return;
    }
    if (codigo.length !== 4) {
      setError("El código debe tener 4 dígitos.");
      return;
    }
    setError("");
    // Enviar formulario o continuar con otro proceso

    // Continuar con el proceso de envío de formulario
  }

  return (
    <form className="form-full-page" onSubmit={validateForm}>
      <div className="form-header">
        <Titulo text="RETIRA TU DINERO"></Titulo> <br />
      </div>
      <img
        className="img-retirar"
        src="/public/retirar-logo.png"
        alt="retiro"
      />
      <h3 className="info-text">Ingresa tú numero de celular</h3>
      <div className="form-body">
        <div className="form-group">
          <input
            value={numeroCelular}
            onChange={(e) => setNumeroCelular(e.target.value)}
            placeholder="Número de celular"
          />
        </div>
        <br />
        <div className="form-group">
          <input
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
  );
}

export default ValidationForm;
