import React from 'react'
import ImageSlider from './components/ImageSlider'
import CardSlider from './components/CardSlider'
import TopProducts from './components/TopProducts'

const Home = () => {
  return (
    <div>
        <ImageSlider />
        <CardSlider />
        <TopProducts />
    </div>
  )
}

export default Home