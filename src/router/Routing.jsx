import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'
import TopProducts from '../components/TopProducts'
import CardSlider from '../components/CardSlider'
import ImageSlider from '../components/ImageSlider'
import Home from '../Home'
import ErrorPageNotFound from '../components/ErrorPageNotFound'


const Routing = () => {
  return (
    <Routes>
        {/* <Route path='/' element={<ImageSlider />} />
        <Route path='/' element={<CardSlider />} />
        <Route path='/' element={<TopProducts />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/*' element={<ErrorPageNotFound />} />

    </Routes>
  )
}

export default Routing