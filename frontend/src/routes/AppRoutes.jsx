import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Register, Login, Cart, Profile, NotFound, NewProduct, ProductDetail, Products } from '../pages'
import ProtectedRoute from '../components/ProtectedRoute'
import PublicRoute from '../components/PublicRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
      }
      />
      <Route path='/cart' element={<Cart />} />
      <Route
        path='/profile' element={
          <ProtectedRoute redirectTo='/login'>
            <Profile />
          </ProtectedRoute>
      }
      />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetail />} />
      <Route
        path='/products/new' element={
          <ProtectedRoute redirectTo='/' requiredRole='admin'>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
