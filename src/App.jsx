import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import ImageSlider from './components/ImageSlider'
import CardSlider from './components/CardSlider'
import TopProducts from './components/TopProducts'
import Advantages from './components/Advantages'
import Footer from './components/Footer'
import Routing from './router/Routing'
import ScrollToTop from './components/ScrollToTop.'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routing />
      <Advantages />
      <Footer />
    </>
  )
}

export default App
