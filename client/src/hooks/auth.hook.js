import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)

  const login = useCallback((jwtToken, id, userName) => {
    setToken(jwtToken)
    setUserId(id)
    setUserName(userName)
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, userName: userName
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserName(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token && data.userName) {
      login(data.token, data.userId, data.userName)
    }
  }, [login])


  return { login, logout, token, userId, userName }
}