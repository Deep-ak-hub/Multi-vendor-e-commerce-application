import React from 'react'
import App from './App'
import {Routes, Route} from "react-router"
import ProductDetails from './pages/product-details'

export default function CustomRoutes() {
  return (
    <Routes>
        <Route path = "/" element = {<App/>}></Route>
        <Route path = ":id" element = {<ProductDetails/>}></Route>
    </Routes>
  )
}
