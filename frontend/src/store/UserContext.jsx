import { createContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setToken(null)
  }

  const auth = async (email, password) => {
    try {
      const url = 'https://6892b6d4c49d24bce8682399.mockapi.io/api/login'
      const payload = { email, password }
      const res = await axios.post(url, payload)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('email', res.data.user.email)
      setToken(localStorage.getItem('token'))
      return true
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
      return false
    }
  }

  const fetchProfile = async () => {
    if (token) {
      try {
        const res = await axios.get('https://6892b6d4c49d24bce8682399.mockapi.io/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfile(res.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const register = async (payload) => {
    try {
      const url = 'https://6892b6d4c49d24bce8682399.mockapi.io/api/register'
      const res = await axios.post(url, payload)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('email', res.data.user.email)
      setToken(localStorage.getItem('token'))
      return true
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
      return false
    }
  }

  const stateGlobal = {
    token,
    profile,
    logout,
    auth,
    fetchProfile,
    register
  }

  return <UserContext.Provider value={stateGlobal}>{children}</UserContext.Provider>
}

export default UserContextProvider
