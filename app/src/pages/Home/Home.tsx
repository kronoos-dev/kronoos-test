// import { useState } from 'react'
import { useEffect, useState } from 'react'
import GetCsvData, { GetCsvDataType } from '../../apis/getCsvData'
import './Home.module.css'
import { Paper } from '@mui/material'
import CsvDataTable from '../../components/CsvDataTable'


function Home() {
  const [data, setData] = useState<GetCsvDataType>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<string>('10')

  useEffect(() => {
    GetCsvData({page: page, perPage: perPage}).then(e => setData(e))

  }, [page, perPage])

  const handlePageCHange = (e: React.MouseEvent<HTMLButtonElement> | null, pageValue: number)=> {
    setPage(pageValue)
  }

  const handlePerPageCHange = (perPageValue: string )=> {
    setPerPage(perPageValue)
  }

  if(!data){
    return(<></>)
  }

  return (
    <Paper elevation={4} sx={{width: '100%'}}> 
      <CsvDataTable csvData={data} onPageChange={handlePageCHange} onPerPageChange={handlePerPageCHange}/>
    </Paper>
  )
}

export default Home
