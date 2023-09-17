interface Column {
    id: string
    label: string;
    minWidth?: number;
}


export const columns: Column[] = [
    {id: 'cdCarteira', label: 'cdCarteira', minWidth: 50},
    {id: 'cdClient', label: 'cdClient', minWidth: 50},
    {id: 'cdProduto', label: 'cdProduto', minWidth: 50},
    {id: 'dsCarteira', label: 'dsCarteira', minWidth: 200},
    {id: 'dsProduto', label: 'dsProduto', minWidth: 100},
    {id: 'dtContrato', label: 'dtContrato', minWidth: 50},
    {id: 'dtVctPre', label: 'dtVctPre', minWidth: 50},
    {id: 'idSitVen', label: 'idSitVen', minWidth: 50},
    {id: 'idSituac', label: 'idSituac', minWidth: 50},
    {id: 'nmClient', label: 'nmClient', minWidth: 100},
    {id: 'nrAgencia', label: 'nrAgencia', minWidth: 50},
    {id: 'nrContrato', label: 'nrContrato', minWidth: 50},
    {id: 'nrCpfCnpj', label: 'nrCpfCnpj', minWidth: 50},
    {id: 'nrInst', label: 'nrInst', minWidth: 50},
    {id: 'nrPresta', label: 'nrPresta', minWidth: 50},
    {id: 'nrSeqPre', label: 'nrSeqPre', minWidth: 50},
    {id: 'qtPrestacoes', label: 'qtPrestacoes', minWidth: 50},
    {id: 'tpPresta', label: 'tpPresta', minWidth: 50},
    {id: 'vlAtual', label: 'vlAtual', minWidth: 50},
    {id: 'vlDescon', label: 'vlDescon', minWidth: 50},
    {id: 'vlIof', label: 'vlIof', minWidth: 50},
    {id: 'vlMora', label: 'vlMora', minWidth: 50},
    {id: 'vlOutAcr', label: 'vlOutAcr', minWidth: 50},
    {id: 'vlPresta', label: 'vlPresta', minWidth: 50},
    {id: 'vlTotal', label: 'vlTotal', minWidth: 50},
];