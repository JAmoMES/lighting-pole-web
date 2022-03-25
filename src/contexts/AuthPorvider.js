import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserData } from '../services/user'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)

  const setUserInfo = (data) => {
    console.log(data)
    localStorage.setItem('token', data.accessToken)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(undefined)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getUserData()
        .then(({ data }) => setUserInfo(data))
        .then(logout)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
