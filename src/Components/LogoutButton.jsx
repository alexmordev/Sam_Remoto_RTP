import React from 'react'
import { Button } from 'primereact/button';

export const LogoutButton = () => {
  return (
    <>

        <Button className="p-button-warning" >
            <i className="pi pi-sign-out px-0"></i>
            {/* <span className="px-0">Cerrar Sesión</span> */}
        </Button>

    </>
  )
}
