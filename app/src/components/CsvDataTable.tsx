import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from '@mui/material';
import { ContractData, GetCsvDataType } from '../apis/getCsvData';

interface TableProps {
  csvData: GetCsvDataType | null
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onPerPageChange: (value: string) => void;
}

const renderContractData = (contracts: ContractData[]) => {
  return contracts.map((contract) => (
    <>
      <TableRow key={contract.nrPresta}>
        <TableCell>{contract.nrPresta}</TableCell>
        <TableCell>{contract.vlTotal}</TableCell>
        <TableCell>{contract.vlPresta}</TableCell>
        <TableCell>{contract.vlMulta}</TableCell>
        <TableCell>{contract.vlMora}</TableCell>
        <TableCell>{contract.vlAtual}</TableCell>
        <TableCell>O {contract.isValidateCpfCnpj.type} é {contract.isValidateCpfCnpj.isValid ? 'Válido' : 'Inválido'}</TableCell>
        <TableCell>{contract.isValidateTotalAndInstallments ? 'Sim' : 'Não  '}</TableCell>
      </TableRow>
    </>
  ));
};


const CsvDataTable: React.FC<TableProps> = ({ onPageChange, csvData, onPerPageChange }) => {

  if (!csvData) {
    return null; // Exibir algum indicador de carregamento aqui
  }

  const { data, page, perPage, totalItems } = csvData;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome Cliente</TableCell>
              <TableCell>Nº Contrato</TableCell>
              <TableCell>Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((clientName, i) => (
              <TableRow key={`${clientName}-${i}`}>
                <TableCell>{clientName}</TableCell>
                {Object.keys(data[clientName]).map((contractNumber, i) => (
                  <>
                    <TableCell>{contractNumber}</TableCell>
                    <TableCell>
                      <Table key={`${contractNumber}-${i}`}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Nº Prestação</TableCell>
                            <TableCell>Valores</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>CPF/CNPJ</TableCell>
                            <TableCell>Valor total e prestação são válidos?</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data[clientName][contractNumber].length > 0 ? (
                            renderContractData(data[clientName][contractNumber])
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2}>No contract data available.</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table></TableCell>
                  </>
                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalItems}
        rowsPerPage={perPage}
        page={page - 1} 
        onRowsPerPageChange={(e) => onPerPageChange(e.target.value)}
        onPageChange={(_, newPage) => onPageChange(null, newPage + 1)}
      />
    </div>
  );
};

export default CsvDataTable;
