import React, { useContext } from 'react'
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
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
        <Button className="p-button-text p-button-sm">
          <Avatar image="https://www.primefaces.org/primeblocks-react/assets/images/blocks/avatars/circle/avatar-f-1.png" className="border-top-1 surface-border lg:border-top-none" shape="circle" />
        </Button>
        <Button icon="pi pi-power-off" className="p-button-text p-button-lg" onClick={action}/>
    </>
  )
}
