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
      const { data } = await axios.post(url, payload)
      return { id: data.data.id, message: data.message }
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
    }
  }

  const fetchBestSellers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/products')
      return setBestSeller(data.data.slice(0, 3))
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
    }
  }

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products')
      const data = await res.json()
      return setProducts(data.data)
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/categories')
      const data = await res.json()
      return setCategories(data.data)
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
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
