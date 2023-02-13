import { useState } from "react";
import "../styles/RetirarDinero.css";
import { Navbar } from '../layouts/Navbar'
import { ToastContainer, toast } from "react-toastify";

function ValidationForm() {
  const [numeroCelular, setNumeroCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [monto, setMonto] = useState("");
  const [error, setError] = useState("");

  function validateForm(e) {
    e.preventDefault()
  }

  const retirarDinero = async () => {
    try {
      if (codigo <= 0 && numeroCelular <=0 && monto <=0 && codigo == 999999) {
        toast.error("La cantidad de caracteres debe ser mayor a 0", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCodigo(""),setNumeroCelular(""),setMonto("");
      } else {
        const datos = await fetch(
          "http://127.0.0.1:8000/mi_api/retiros",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "usuario": numeroCelular,
              "codigo": codigo,
              "monto": monto,
              "usuario_origen": localStorage.getItem("usuarioCorresponsal")
            }),
          }
          );
          if (datos.ok) {
          const data = await datos.json();
          console.log(data)
          console.log(numeroCelular)
          console.log(codigo)
          console.log(monto)
          if (data.msg == "Retiro exitoso") {
            toast.success("Retiro Realizado!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setCodigo('')
            setMonto('')
            setNumeroCelular('')
          }
          if (data.msg == "Codigo invalido") {
            toast.error("Error, verifique los datos!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    } catch (error) {
      alert('mal')
      toast.error("Saldo insuficiente !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setMonto("");
    }
  };


  return (
    <div>
      <Navbar />
      <ToastContainer />
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
              placeholder="Codigo de verificacion"
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type='number'
              name="monto"
              required
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Monto a retirar"
            />
          </div>
          {error && <p>{error}</p>}
        </div>
        <div className="form-footer">
          <button type="submit" onClick={retirarDinero}>Submit</button>
        </div>
      </form>
    </div>

  );
}

export default ValidationForm;
