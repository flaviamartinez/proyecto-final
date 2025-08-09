import { createContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  const createProduct = async (payload) => {
    try {
      const url = 'https://6892b6d4c49d24bce8682399.mockapi.io/api/products'
      const res = await axios.post(url, payload)
      return res.data.message
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

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://6892b6d4c49d24bce8682399.mockapi.io/api/products')
      const data = await res.data
      return setProducts(data.slice(0, 3))
    } catch (error) {
      console.error(error)
    }
  }

  const stateGlobal = {
    createProduct,
    fetchProducts,
    products,
    setProducts
  }

  return <ProductContext.Provider value={stateGlobal}>{children}</ProductContext.Provider>
}

export default ProductContextProvider
