import { Container } from '@mui/material'
import Router from './Router'
import Header from './components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <Container maxWidth={false}>
        <Router />
      </Container>
    </>
  )
}

export default App
