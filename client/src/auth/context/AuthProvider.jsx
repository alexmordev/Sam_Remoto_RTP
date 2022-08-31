import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../../types/types'

const init = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const user = JSON.parse(localStorage.getItem('token'));

  return {
    logged: !!user,
    user: user
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init)

  const login = async (email, password) => {

    const user = { email, password }

    const action = {
      type: types.login,
      payload: user
    }

    // localStorage.setItem('user', JSON.stringify(user))

    dispatch(action);

  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    const action = { type: types.logout };
    dispatch(action);
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login: login,
      logout: logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
