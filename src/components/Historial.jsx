import React, { useEffect, useState } from 'react'
import { Navbar } from '../layouts/Navbar'
import '../styles/Historial.css';
export const Historial = () => {
    const [historial, setHistorial] = useState([])
    const [cargando, setCargando] = useState(false)
    const fetchData = async () => {
        const user =localStorage.getItem('usuarioCorresponsal')
        try {
            const datos = await fetch(`http://127.0.0.1:8000/mi_api/historial?usuario=${user}`, { /*Esto es un ejemplo*/
                method: 'GET'
            });
            if (datos.ok) {
                const data = await datos.json();
                setHistorial(data);
                setCargando(true);
            }
        } catch (error) {
            console.log('El error es', error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='contenedor-historial'>
            <Navbar />
            <h1>Historial</h1>
            <div className='contenedor-tabla-historial'>
                {cargando !== false ? (
                    historial['results'].historial.length >= 1 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Cuenta origen</th>
                                <th>Monto</th>
                                <th>Cuenta destino</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                        { historial['results'].historial.map((dato,index)=>{
                            return(
                                <tr key={index}>
                                    <td><p>{dato[0]}</p></td>
                                    <td><p>{dato[2]}</p></td>
                                    <td><p>{dato[3]}</p></td>
                                    <td><p>{dato[1]}</p></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    ):<h1>No hay historial</h1>
                ) : <h1>Cargando...</h1>}
            </div>
        </div>
    )
}
