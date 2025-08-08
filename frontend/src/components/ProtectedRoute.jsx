import React, { useContext } from 'react'
import { UserContext } from '../store/UserContext.jsx'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, redirectTo }) => {
  const { token } = useContext(UserContext)
  return token ? children : <Navigate to={redirectTo} />
}

export default ProtectedRoute
