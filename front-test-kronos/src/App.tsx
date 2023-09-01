import {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment';

type DataFetchProps = {
  vlTotal: string;
  vlPresta: string;
  vlMora: string;
  nrCpfCnpj: string;
  qtPrestacoes: string;
  dtContrato: string;
  dtVctPre: string;
}

export function App() {
  const [data, setData] = useState<DataFetchProps[]>([])

  async function getData() {
    try {
      const response = await axios.get('http://localhost:3005/dados')
      const updatedData = verifyVlPresta(response.data)
      setData(updatedData)
      if (response.status === 200) {
        console.log('Request OK !')
      }
    } catch (e: unknown) {
      console.log(e)
    }
  }

  function formatCurrency(value: string) {
    const numericValue = parseFloat(value)
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return formatter.format(numericValue)
  }

  function formatDocument(document: string) {
    const cleanedDocumento = document.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cleanedDocumento.length === 11) {
      // CPF
      return cleanedDocumento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cleanedDocumento.length === 14) {
      // CNPJ
      return cleanedDocumento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      return 'Documento inválido';
    }
  }

  function formatDate(stringDate: string) {
    const dateFormatted = moment(stringDate, 'YYYYMMDD');
    return dateFormatted.format('DD/MM/YYYY')
  }

  function verifyVlPresta(updatedData: DataFetchProps[]) {
    const newData = updatedData.map((item) => {
      const valorPrestacaoCalculado = parseFloat(item.vlTotal) / parseFloat(item.qtPrestacoes);
      if (valorPrestacaoCalculado !== parseFloat(item.vlPresta)) {
        item.vlPresta = valorPrestacaoCalculado.toFixed(2); // Substitui o valor
      }
      return item;
    });
    return newData;
  }

  useEffect(() => {
    getData()
  }, [])



  return (
      <div>
        {data.length > 0 ? (
          <div>
            <p><strong>Valor total:</strong> {formatCurrency(data[0].vlTotal)}</p>
            <p><strong>Valor prestação:</strong> {formatCurrency(data[0].vlPresta)}</p>
            <p><strong>Valor mora:</strong> {formatCurrency(data[0].vlMora)}</p>
            <p><strong>Cpf / Cnpj:</strong> {formatDocument(data[0].nrCpfCnpj)}</p>
            <p><strong>Quantidade de prestação:</strong> {data[0].qtPrestacoes}</p>
            <p><strong>Data do contrato:</strong> {formatDate(data[0].dtContrato)}</p>
            <p><strong>Data de vencimento:</strong> {formatDate(data[0].dtVctPre)}</p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
  )
}


