import React from 'react'
import { Button2 } from '../../Components/LoginComponents/Button'
import { PassInput } from '../../Components/LoginComponents/PassInput'
import { UserInput } from '../../Components/LoginComponents/UserInput'
import { Imagen } from '../../Components/LoginComponents/Imagen'

export const Login = () => {
  console.log('Estas en login');
  return (
    <div className='h-full w-full flex align-items-center justify-content-center '>
      <div className=' h-30rem w-30rem flex  align-items-center  flex-column justify-content-around'>
          <Imagen />
          <UserInput/>
          <PassInput/>  
          <Button2/>
      </div>
    </div>
      
  )
}
