import { createContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [role, setRole] = useState(localStorage.getItem('role'))
  const [wishlist, setWishlist] = useState(null)

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    setToken(null)
    setRole(null)
    setProfile(null)
    setWishlist([])
  }

  const auth = async (email, password) => {
    try {
      const url = 'https://proyecto-final-txuj.onrender.com/api/login'
      const payload = { email, password }
      const { data } = await axios.post(url, payload)
      const { token, user } = await data.data

      localStorage.setItem('token', token)
      localStorage.setItem('email', user)
      setToken(token)

      return true
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
    }
  }

  const fetchProfile = async () => {
    if (token) {
      try {
        const { data } = await axios.get('https://proyecto-final-txuj.onrender.com/api/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfile(data.data.user)
        setWishlist(data.data.wishlist)
        localStorage.setItem('role', data.data.user.rol)
        setRole(localStorage.getItem('role'))
      } catch (error) {
        const msg = error.response?.data?.message || 'Ocurrió un error'
        Swal.fire('Error', msg, 'error')
      }
    } else {
      setProfile(null)
      setWishlist([])
      setRole(null)
    }
  }

  const register = async (payload) => {
    try {
      const url = 'https://proyecto-final-txuj.onrender.com/api/register'
      const { data } = await axios.post(url, payload)
      const { token, email } = data.data
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      setToken(token)
      return true
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
    }
  }

  const addToWishlist = async (productId, userId) => {
    try {
      const url = 'https://proyecto-final-txuj.onrender.com/api/wishlist'
      const payload = { productId, userId }
      const { data } = await axios.post(url, payload)
      setWishlist(data.data.wishlist)
      return true
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
    }
  }

  const deleteFromWishlist = async (productId, userId) => {
    try {
      const url = 'https://proyecto-final-txuj.onrender.com/api/wishlist'
      const payload = { productId, userId }
      const { data } = await axios.delete(url, {
        data: payload
      })
      setWishlist(data.data.wishlist)
      return true
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error'
      Swal.fire('Error', msg, 'error')
      return false
    }
  }

  const stateGlobal = {
    token,
    profile,
    logout,
    auth,
    fetchProfile,
    register,
    role,
    wishlist,
    addToWishlist,
    deleteFromWishlist
  }

  return <UserContext.Provider value={stateGlobal}>{children}</UserContext.Provider>
}

export default UserContextProvider
