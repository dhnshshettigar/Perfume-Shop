import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
      </Routes>
    </div>
  )
}

export default App