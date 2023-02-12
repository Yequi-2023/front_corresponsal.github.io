import { useState } from 'react'
import { useEffect } from 'react'
import '../styles/formNuevaCuentaCorresponsal.css'
import { Link } from 'react-router-dom'

function FormNuevaCuentaCorresponsal() {
    const [form, setForm] = useState({})
    const [flag, setFlag] = useState(0)

    const fetchData = async () => {

        try {
            if (flag == 1) {

                try {
                    const datos = await fetch('http://127.0.0.1:8000/mi_api/mostrar_datos', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 'usuario': form.celular })
                    });
                    if (datos.ok) {
                        const data = await datos.json()

                        if (data == "El usuario no existe") {

                            const datos = await fetch('http://127.0.0.1:8000/mi_api/crear_usuario', {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(form)

                            });
                            if (datos.ok) {
                                const data = await datos.json()
                                document.querySelector('input.text1').value = ""
                                document.querySelector('input.text2').value = ""
                                document.querySelector('input.text3').value = ""
                                document.querySelector('input.text4').value = ""
                                document.querySelector('div.CFormulario').style.display = 'none'
                                document.querySelector('div.CFormulario3').style.display = 'none'
                                document.querySelector('div.CFormulario2').style.display = 'block'
                            }
                        } else {
                            document.querySelector('input.text1').value = ""
                            document.querySelector('input.text2').value = ""
                            document.querySelector('input.text3').value = ""
                            document.querySelector('input.text4').value = ""
                            document.querySelector('div.CFormulario').style.display = 'none'
                            document.querySelector('div.CFormulario2').style.display = 'none'
                            document.querySelector('div.CFormulario3').style.display = 'block'
                        }
                    }
                    else {
                    }
                } catch (error) {
                    console.log("El error es", error);
                }
            }
        } catch (error) {

            console.log("El error es", error);

        }
    }

    useEffect(() => {
        fetchData()
    }, [form])

    return (
        <div className="FormNuevaCuenta">
            <div className='logo-usuario'>
                <img src="/logo.png" alt="" />

            </div>
            <section className="nuevaCuenta" >
                <div className="CNuevaCuenta">
                    <h2>CREACIÓN CORRESPONSAL</h2>
                    <hr />
                    <div className="CFormulario">
                        <h2>Formulario de creación cuenta</h2>
                        <form className="formulario" onSubmit={ev => {
                            ev.preventDefault();
                            let nombre = ev.target.nombres.value

                            let email = ev.target.correo.value
                            let celular = ev.target.celular.value
                            let contraseña = ev.target.contraseña.value
                            let total = { nombre, email, celular, contraseña, 'rol': "corresponsal" }
                            //[nombre, email, celular, contraseña]
                            setForm(total)
                            setFlag(1)
                            //console.log(form)

                        }}>
                            <div className="contenedorFormulario">
                                <div >
                                    <label htmlFor="nombres" >Nombres</label>
                                    <input type="text" name="nombres" className='text1'
                                        placeholder="Ingrese nombres completos" maxLength={"45"} required />
                                </div>
                                <div >
                                    <label htmlFor="correo">Correo electrónico</label>
                                    <input type="email" name="correo" className='text2' placeholder="Ingrese correo electrónico" maxLength={"45"} required />
                                </div>
                                <div >
                                    <label htmlFor="celular">Celular</label>
                                    <input type="text" name="celular" className='text3'
                                        placeholder="Ingrese número celular" maxLength={"10"} minLength="10" pattern='[0-9]+' required />
                                </div>
                                <div >
                                    <label htmlFor="contraseña">Contraseña</label>
                                    <input type="password" pattern='[0-9]+' name="contraseña" className='text4'
                                        placeholder="Ingrese cuatro numeros" maxLength={"4"} minLength={"4"} required />
                                </div>


                            </div>
                            <button type="submit" >Aceptar</button>

                        </form>
                    </div>
                    <div className="CFormulario2">
                        <h2>Cuenta creada exitosamente</h2>
                        <Link to="/" className='cardw'> Aceptar
                        </Link>
                    </div>
                    <div className="CFormulario3">
                        <h2>La cuenta para el número celular indicado ya existe</h2>
                        <Link to="/" className='cardw'> Aceptar
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormNuevaCuentaCorresponsal
