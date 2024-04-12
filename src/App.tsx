import { useEffect, useState } from 'react'
import './App.css'
import { Content } from './response'
import ReactPaginate from 'react-paginate';

function App() {
  const [dataFutbolistas, setDataFutbolistas] = useState<Content[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const [pageCount, setPageCount] = useState(0);

  const getDataFutbolista = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/futbolista/page?page=${pageNumber}&size=${itemsPerPage}`, {
        method: "GET"
      });
      const jsonData = await response.json();
      setDataFutbolistas(jsonData.content);
      setPageCount(jsonData.totalPages);
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    getDataFutbolista();
  }, [pageNumber]); 

  const verDetalleFutbolista = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/futbolista/${id}`, {
        method: "GET"
      });
      const futbolistaDetalle = await response.json();
      alert(`Detalles del futbolista : ${futbolistaDetalle.nombres} ${futbolistaDetalle.apellidos}\nFecha de Nacimiento: ${futbolistaDetalle.fechaNacido}\nPosición: ${futbolistaDetalle.posicion.nombre}\nCaracterísticas: ${futbolistaDetalle.caracteristicas}`);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const data = dataFutbolistas.map(futbolista => (
    <tr key={futbolista.idFutbolista}>
      <td>{futbolista.idFutbolista}</td>
      <td>{futbolista.nombres}</td>
      <td>{futbolista.apellidos}</td>
      <td>{futbolista.posicion.nombre}</td>
      <td>
        <button onClick={() => verDetalleFutbolista(futbolista.idFutbolista)}>Ver Detalle</button>
      </td>
    </tr>
  ));

  return (
    <div className='container'>
      <h1 className="title">Lista de Futbolistas</h1>
      <table className="table">
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
          {data}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default App;
