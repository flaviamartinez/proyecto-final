import { useState, useEffect } from 'react'

const Products = () => {
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    try {
      const res = await fetch('https://6892b6d4c49d24bce8682399.mockapi.io/api/products')
      const data = await res.json()
      return setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <pre>{JSON.stringify(products, null, 2)}</pre>
  )
}

export default Products
