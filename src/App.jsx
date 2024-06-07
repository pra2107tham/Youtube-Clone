import React from 'react'
import Home from './Pages/Home'
import Search from './Pages/Search'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Watch from './Pages/Watch'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/search' element={<Search/>} />
    <Route path='/watch:id' element={<Watch/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App