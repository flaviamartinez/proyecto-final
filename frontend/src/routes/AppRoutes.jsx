import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Register, Login, Cart, Profile, NotFound, NewProduct, ProductDetail, Products } from '../pages'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetail />} />
      <Route path='/products/new' element={<NewProduct />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
