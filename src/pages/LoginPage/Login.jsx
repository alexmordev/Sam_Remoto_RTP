import React from 'react'
import { Button2 } from '../../Components/LoginComponents/Button'
import { PassInput } from '../../Components/LoginComponents/PassInput'
import { UserInput } from '../../Components/LoginComponents/UserInput'
// import { Imagen } from '../../Components/LoginComponents/Imagen'

export const Login = () => {
  console.log('Estas en login');
  return (
    // <div>Login</div>
    <>

    {/* <Imagen/> */}
    {/* /SECCIÓN  DE COMPONENTES/ */}
    <UserInput/>
    <br/>
    <PassInput/>
    <br/>
    <Button2/>
    </>
  )
}
