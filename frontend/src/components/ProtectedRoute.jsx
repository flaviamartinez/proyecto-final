import React, { useContext } from 'react'
import { UserContext } from '../store/UserContext.jsx'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, redirectTo, requiredRole }) => {
  const { token, role } = useContext(UserContext)

  if (!token) {
    return <Navigate to={redirectTo} />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={redirectTo} />
  }

  return children
}

export default ProtectedRoute
