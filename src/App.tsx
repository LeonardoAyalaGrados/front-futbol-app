import { useEffect, useState } from 'react'
import './App.css'
import { Content, ResponseData } from './response'


function App() {
  const [dataFutbolistas,setDataFutbolistas]=useState<Content[]>([]);

  const getDataFutbolista=async()=>{
    const response=await fetch("http://localhost:8080/api/futbolista/page",{
      method:"GET"
    })
    const jsonData:ResponseData= await response.json();
    console.log(jsonData);
    setDataFutbolistas(jsonData.content);
  }

  const verDetalleFutbolista = async(id:number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/futbolista/${id}`, {
        method: "GET"
      });
      const futbolistaDetalle = await response.json();
      console.log(futbolistaDetalle)
      alert(`Detalles del futbolista : ${futbolistaDetalle.nombres+" "+futbolistaDetalle.apellidos}\nFecha de Nacimiento: ${futbolistaDetalle.fechaNacido}\nPosición: ${futbolistaDetalle.posicion.nombre}\nCaracterísticas: ${futbolistaDetalle.caracteristicas}`);
    } catch (error) {
      console.error("Error al obtener detalles", error);
    }

  };

  useEffect(()=>{
    getDataFutbolista();
  },[])

  return (
<div className='container'>
    <h1 className="title">Lista de Futbolistas</h1>
    <table  className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Posición</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dataFutbolistas.map((futbolista) => (
            <tr key={futbolista.idFutbolista}>
              <td>{futbolista.idFutbolista}</td>
              <td>{futbolista.nombres}</td>
              <td>{futbolista.apellidos}</td>
              <td>{futbolista.posicion.nombre}</td>
              <td>
                <button  onClick={() => verDetalleFutbolista(futbolista.idFutbolista)}>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}

export default App
