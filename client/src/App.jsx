
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import AddForm from './components/addForm'
import { useState } from 'react'

function App() {
  const [expense,setExpense]=useState([])
  return (
    <>

      {/* <Navbar expense={expense} setExpense={setExpense} /> */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addExpense' element={<AddForm/>}></Route>
        
      </Routes>
    </>
  )
}

export default App
