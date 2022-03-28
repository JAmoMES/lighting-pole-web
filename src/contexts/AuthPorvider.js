import React, { createContext, useContext, useEffect, useState } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { getUserData } from '../services/user'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const setUserInfo = (data) => {
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
        .then(({ data }) => {
          setUser(data)
        })
        .catch(logout)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUserInfo, logout, loading, setLoading }}
    >
      {loading && (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
