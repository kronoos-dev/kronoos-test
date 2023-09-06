import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function formatDate(inputDate) {
  const formattedDate = inputDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
  const date = new Date(formattedDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function Api() {
  const { page } = useParams();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page || 1);

  const handleSubmit = () => {
    setData([]);
    axios
      .get(`http://localhost:4000/api/entities?page=${currentPage}&limit=1000`, {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        setData(response.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  };

  function renderPagination() {
    const pageArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="pagination">
        {pageArray.map((pageNumber) => (
          <Link key={pageNumber} to={`/pagina/${pageNumber}`}>
            {pageNumber}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Minha Página</h2>
      <div>
        <label htmlFor="pageInput">Página:</label>
        <input
          type="number"
          id="pageInput"
          value={currentPage}
          onChange={handlePageChange}
        />
        <button onClick={handleSubmit}>Enviar</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nr. Agencia</th>
            <th>cd. Client</th>
            <th>Client</th>
            <th>Cpf Cnpj</th>
            <th>dt Contrato</th>
            <th>Prestacoes</th>
            <th>Total</th>
            <th>Produto</th>
            <th>descrição Produto</th>
            <th>cdCarteira</th>
            <th>dsCarteira</th>
            <th>Proposta</th>
            <th>Presta</th>

        
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.nrInst}>
              <td>{item.nrAgencia}</td>
              <td>{item.cdClient}</td>
              <td>{item.nmClient}</td>
              <td>{item.nrCpfCnpj}</td>
              <td>{formatDate(item.dtContrato)}</td>
              <td>{item.qtPrestacoes}</td>
              <td>{item.vlTotal}</td>
              <td>{item.vlTotal}</td>
              <td>{item.dsProduto}</td>
              <td>{item.cdCarteira}</td>
              <td>{item.dsCarteira}</td>
              <td>{item.nrProposta}</td>
              <td>{item.nrPresta}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && renderPagination()}
    </div>
  );
}

export default Api;
