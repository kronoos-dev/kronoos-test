import React, { useState, useEffect } from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { Container, ContainerHeader, ContainerLogo, ContainerBody, ContainerContentTable, } from "./styles";
import ImgLogo from '../../assets/kronoosLogo.png'

import { isCpfValid, isCnpjValid } from '../../utils/validation';
import { formatDateYYYYMMDDToBR } from '../../utils/dateFormated';

import api from "../../services";

function Home() {
    const [data, setData] = useState([]);
    const [id, setId] = useState(1)

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
        },
        {
            field: 'nrInst',
            headerName: 'N° Instituição',
            width: 120,
        },
        {
            field: 'nrAgencia',
            headerName: 'N° Agência',
            width: 100,
        },
        {
            field: 'cdClient',
            headerName: 'Código Cliente',
            width: 130,
        },
        {
            field: 'nmClient',
            headerName: 'N° Cliente',
            width: 130,
        },
        {
            field: 'nrCpfCnpj',
            headerName: 'CPF/CNPJ',
            width: 220,
        },
        {
            field: 'nrContrato',
            headerName: 'N° Contrato',
            width: 150,
        },
        {
            field: 'dtContrato',
            headerName: 'Data Contrato',
            width: 150,
            valueFormatter: (params) => {
                return formatDateYYYYMMDDToBR(params.value);
            }
        },
        {
            field: 'qtPrestacoes',
            headerName: 'Qtd Prestações',
            width: 150,
        },
        {
            field: 'vlTotal',
            headerName: 'Valor Total',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'cdProduto',
            headerName: 'Código Produto',
            width: 150,
        },
        {
            field: 'dsProduto',
            headerName: 'Descrição Produto',
            width: 230,
        },
        {
            field: 'cdCarteira',
            headerName: 'Código Carteira',
            width: 150,
        },
        {
            field: 'dsCarteira',
            headerName: 'Descrição Carteira',
            width: 290,
        },
        {
            field: 'nrProposta',
            headerName: 'N° Proposta',
            width: 150,
        },
        {
            field: 'nrPresta',
            headerName: 'N° Prestação',
            width: 150,
        },
        {
            field: 'tpPresta',
            headerName: 'TP Prestação',
            width: 150,
        },
        {
            field: 'nrSeqPre',
            headerName: 'N° Seq Prestação',
            width: 150,
        },
        {
            field: 'dtVctPre',
            headerName: 'Data Vencimento Prestação',
            width: 230,
            valueFormatter: (params) => {
                return formatDateYYYYMMDDToBR(params.value);
            }
        },
        {
            field: 'vlPresta',
            headerName: 'Valor Prestação',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'valorPrestacaoCalculado',
            headerName: 'Valor Prestação Calculado',
            width: 230,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'vlMora',
            headerName: 'Valor Mora',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'vlMulta',
            headerName: 'Valor Multa',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'vlOutAcr',
            headerName: 'Valor Out Acr',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'vlIof',
            headerName: 'Valor IOF',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'vlDescon',
            headerName: 'Valor Desconto',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'vlAtual',
            headerName: 'Valor Atual',
            width: 150,
            valueFormatter: (params) => {
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }).format(params.value);
                return formattedValue;
            },
        },
        {
            field: 'idSituac',
            headerName: 'ID Situação',
            width: 150,
        },
        {
            field: 'idSitVen',
            headerName: 'ID Situação Vencida',
            width: 180,
        },
    ];

    async function getData() {
        try {
            const response = await api.get('/readCsv');
            const formattedData = response.data.map((item, index) => {
                if (isCpfValid(item.nrCpfCnpj)) {
                    item.nrCpfCnpj = `CPF: ${item.nrCpfCnpj}`;
                } else if (isCnpjValid(item.nrCpfCnpj)) {
                    item.nrCpfCnpj = `CNPJ: ${item.nrCpfCnpj}`;
                } else {
                    item.nrCpfCnpj = `${item.nrCpfCnpj} - Inválido`;
                }

                const valorTotal = parseFloat(item.vlTotal);
                const qtPrestacoes = parseInt(item.qtPrestacoes);
                const valorPresta = parseFloat(item.vlPresta);

                const valorCalculado = valorTotal / qtPrestacoes;

                const newRow = {
                    ...item,
                    id: id + index,
                    valorPrestacaoCalculado: valorCalculado
                };

                return newRow;
            });
            setData(formattedData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            <ContainerHeader>
                <ContainerLogo src={ImgLogo} />
            </ContainerHeader>
            <ContainerBody>
                <ContainerContentTable>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        getRowId={(row) => row.id}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 20,
                                },
                            },
                        }}
                        pageSizeOptions={[20, 50, 100]}
                        checkboxSelection={false}
                        disableRowSelectionOnClick
                    />
                </ContainerContentTable>
            </ContainerBody>
        </Container>
    );
}

export default Home;