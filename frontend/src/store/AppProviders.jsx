import React from 'react'
import UserContextProvider from './UserContext.jsx'
import ProductContextProvider from './ProductContext.jsx'
import CartContextProvider from './CartContext.jsx'

const AppProviders = ({ children }) => {
  return (
    <CartContextProvider>
      <ProductContextProvider>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </ProductContextProvider>
    </CartContextProvider>
  )
}

export default AppProviders
