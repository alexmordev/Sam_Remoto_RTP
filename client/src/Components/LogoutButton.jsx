import React from 'react'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  
    const navegar = useNavigate();

    const action = () => {
      localStorage.removeItem("token")
      navegar('/');
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
