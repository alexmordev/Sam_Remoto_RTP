import React, { useContext } from 'react'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext'

export const LogoutButton = () => {
  
  const { logout } = useContext( AuthContext )
  const navigate = useNavigate();

  const action = () => {
    localStorage.removeItem("token")
    navigate('/');
    logout();
  }

    
  return (
    <>
      <Button className="p-button-text p-button-plain pi pi-power-off" onClick={action}/>
    </>
  )
}
