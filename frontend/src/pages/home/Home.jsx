import React, { useState } from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/exploremenu/ExploreMenu'
import FoodDisplay from '../../components/fooddisplay/FoodDisplay'
import AppDownload from '../../components/appdownload/AppDownload'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div className='home'>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} setCategory={setCategory} />
      <AppDownload />
    </div>
  )
}

export default Home
