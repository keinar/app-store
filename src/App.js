import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Filters from './components/Filters'
import FilterSort from './components/FilterSort'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Filters/>
        <FilterSort/>
        <Main />
        <Footer />
      </Router>
      <Cart />
    </>
  )
}

export default App
