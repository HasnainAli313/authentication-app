import { useState } from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home  from './pages/Home'
import Private  from './pages/Private'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index path="/"  element={<Home/>} />
        <Route  path="/private"  element={<Private/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
