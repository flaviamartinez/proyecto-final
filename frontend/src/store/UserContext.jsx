import { createContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [role, setRole] = useState(localStorage.getItem('role'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    setToken(null)
    setRole(null)
    setProfile(null)
  }

  const auth = async (email, password) => {
    try {
      const url = 'http://localhost:3000/api/login'
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
        const { data } = await axios.get('http://localhost:3000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setProfile(data.data)
        localStorage.setItem('role', data.data.rol)
        setRole(localStorage.getItem('role'))
      } catch (error) {
        const msg = error.response?.data?.message || 'Ocurrió un error'
        Swal.fire('Error', msg, 'error')
      }
    }
  }

  const register = async (payload) => {
    try {
      const url = 'http://localhost:3000/api/register'
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

  const stateGlobal = {
    token,
    profile,
    logout,
    auth,
    fetchProfile,
    register,
    role
  }

  return <UserContext.Provider value={stateGlobal}>{children}</UserContext.Provider>
}

export default UserContextProvider
