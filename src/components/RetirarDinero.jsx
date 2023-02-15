import { useState } from "react";
import "../styles/RetirarDinero.css";
import { Navbar } from '../layouts/Navbar'
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";

function ValidationForm() {
  const [numeroCelular, setNumeroCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [monto, setMonto] = useState("");
  const [error, setError] = useState("");

  const [cuentaDestino, setCuentaDestino] = useState(0);
  const [montoT, setMontoT] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  const leerCuenta = (e) => {
    setCuentaDestino(e.target.value);
  };

  const leerInputMonto = (e) => {
    setMontoT(e.target.value);
  };

  const leerInputDescrip = (e) => {
    setDescripcion(e.target.value);
  };

  const fetchData = async () => {
    try {
      if (montoT <= 0) {
        toast.error("El monto debe ser mayor a 0", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setMontoT("");
      } else {
        const datos = await fetch(
          "http://127.0.0.1:8000/mi_api/transferencia",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              monto: montoT,
              descripcion: descripcion == "" ? "Transferencia" : descripcion,
              usuario_origen: localStorage.getItem("usuarioCorresponsal"),
              usuario_destino: cuentaDestino,
            }),
          }
        );
        if (datos.ok) {
          const data = await datos.json();
          if (data.msg == "Transaccion exitosa") {
            toast.success("Recarga Realizada!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            window.location.reload();
          }
          if (data == "Cuenta destino no existe") {
            toast.error("Cuenta destino no existe!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    } catch (error) {
      toast.error("Saldo insuficiente !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setMontoT("");
    }
  };


  const datos_formulario = (e) => {
    e.preventDefault();
  };

  function validateForm(e) {
    e.preventDefault()
  }

  const retirarDinero = async () => {
    try {
      if (codigo <= 0 && numeroCelular <= 0 && monto <= 0 && codigo == 999999) {
        toast.error("La cantidad de caracteres debe ser mayor a 0", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCodigo(""), setNumeroCelular(""), setMonto("");
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
          if (data.msg == "Retiro exitoso") {
            toast.success("Retiro Realizado!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setCodigo('')
            setMonto('')
            setNumeroCelular('')
            window.location.reload();
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
      <Link to="/historial" className="contenedor-inicio-historial">
        <img src="/logo-historial.png" alt="logo-historial" />
        <h3>historial</h3>
      </Link>
      <div className="contenedor-todo-corresponsal">
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
            <button type="submit" onClick={retirarDinero}>Retirar</button>
          </div>
        </form>
        <div className="transferencia">
          <form
            className="formulario_transferencia recarga"
            onSubmit={(e) => datos_formulario(e)}
          >
            <img
            className="img-recargar"
            src="/recarga-logo.png"
            alt="retiro"
          />
            <div className="cont_input1">
              <label className="info-text2 primero">Ingresa tú numero de celular</label>
              <input type="number" placeholder="Número de celular" onChange={leerCuenta} required />
            </div>
            <div className="campo_identificacion_transferencia">
              <div className="info-text2">
                <input type="text" placeholder="Descripción" onChange={leerInputDescrip} />
              </div>
            </div>
            <div className="info-text2">
              <input
                className="monto-recarga"
                type="number"
                value={montoT}
                placeholder="Monto a recargar"
                onChange={leerInputMonto}
                required
              />
            </div>
            <button className="transferir" onClick={fetchData}>
              Recargar
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default ValidationForm;
