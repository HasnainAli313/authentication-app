import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children,user}) => {
  return user ? children : <Navigate to="/"></Navigate>
}

export default ProtectedRoute
 