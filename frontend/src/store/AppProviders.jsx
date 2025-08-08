import React from 'react'
import UserContextProvider from './UserContext.jsx'
// import CartContextProvider from './CartContext.jsx'

const AppProviders = ({ children }) => {
  return (
  // <CartContextProvider>
    <UserContextProvider>
      {children}
    </UserContextProvider>
  // </CartContextProvider>
  )
}

export default AppProviders
