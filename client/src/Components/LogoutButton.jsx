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

        <Button className="mr-3 p-button-warning" onClick={action} >
            <i className="pi pi-sign-out px-0"></i>
            {/* <span className="px-0">Cerrar Sesión</span> */}

        </Button>

    </>
  )
}
