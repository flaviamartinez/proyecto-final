import React, { useContext } from 'react'
import { UserContext } from '../store/UserContext'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const { token } = useContext(UserContext)
  return token ? <Navigate to='/profile' replace /> : children
}

export default PublicRoute
