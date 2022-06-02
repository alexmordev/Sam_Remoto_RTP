import React from 'react'
import { Button } from 'primereact/button';
import { LogoutButton } from './LogoutButton';
import { Toolbar } from 'primereact/toolbar';

export const Navigator = () => {

    const left_items = (
        <>
          <Button label='Inicio' className='p-button-link'/>
          <Button label='Aplicación' className='p-button-link'/>
          <Button label='Gestión' className='p-button-link'/>
        </>)
   

  return (
    <div>
        
        <Toolbar left={left_items} right={<LogoutButton/>}/>

    </div>
  )
}
