import { createContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [bestSeller, setBestSeller] = useState([])
  const [categories, setCategories] = useState([])

  const createProduct = async (payload) => {
    try {
      const url = 'http://localhost:3000/api/products'
      const res = await axios.post(url, payload)
      return res.data.id
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.error
        })
      } else {
        console.log('Error de conexión con el servidor')
      }
    }
  }

  const fetchBestSellers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products')
      const data = await res.data
      return setBestSeller(data.slice(0, 3))
    } catch (error) {
      console.error(error)
    }
  }

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products')
      const data = await res.json()
      return setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/categories')
      const data = await res.json()
      return setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  const stateGlobal = {
    createProduct,
    fetchBestSellers,
    bestSeller,
    getProducts,
    products,
    fetchCategories,
    categories
  }

  return <ProductContext.Provider value={stateGlobal}>{children}</ProductContext.Provider>
}

export default ProductContextProvider
