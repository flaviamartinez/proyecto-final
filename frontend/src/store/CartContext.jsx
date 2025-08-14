import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  const addProduct = async (product, qty) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)

      if (exists) {
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        )
      }

      return [...prev, { ...product, qty }]
    })
  }

  const updateQty = async (id, qty) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === id)

      if (exists) {
        return prev.map(p =>
          p.id === id ? { ...p, qty } : p
        )
      }
    })
  }

  const removeProduct = async (id) => {
    setCart(prev => {
      return prev.filter(p => p.id !== id)
    })
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const stateGlobal = {
    cart,
    addProduct,
    removeProduct,
    updateQty
  }

  return <CartContext.Provider value={stateGlobal}>{children}</CartContext.Provider>
}

export default CartContextProvider
