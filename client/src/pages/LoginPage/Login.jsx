import React from 'react'
import { LoginPrincipal } from './../../Components/LoginComponents/LoginPrincipal';

export const Login = () => {
  console.log('Estas en login');
  return (

    <div>
      <LoginPrincipal />
    </div>

  
      
  )
}

{/* <div className='bg-bluegray-300 h-screen w-screen flex align-items-center justify-content-center '>
      <div className=' h-30rem w-30rem flex  align-items-center  flex-column justify-content-around'>
          <Imagen />
          <UserInput/>
          <PassInput/>  
          <Link to="/homepage">
            <Button2/>
          </Link>
      </div>
    </div> */}
