import React from 'react';
import { LogoHeader } from '../LogoHeader';
import { Button } from 'primereact/button';
import { LogoutButton } from '../LogoutButton';
import { Toolbar } from 'primereact/toolbar';
import { SplitButton } from 'primereact/splitbutton';



export const Header = () => {
  const items = [
    {
      label: 'Dumps',
      icon: 'pi-angle-right',
    },
    {
      label: 'Contadores',
      icon: 'pi-angle-right',
    }
  ]

  const left_items = (
    <>
      <Button label='Inicio' className='p-button-link'/>
      <Button label='Aplicación' className='p-button-link'/>
      <SplitButton label='Gestión' className='p-button-link bg-white' model={items}></SplitButton>     
    </>
  )

    



  return (
    <div className="w-screen h-4rem ">

      <Toolbar className='w-screen absolute top-0 right-0' left={left_items} right={<LogoutButton/>}/>

      

    </div>
  )
}



/* 
<ul class="topbar-menu p-unselectable-text" role="menubar">
      <li role="none" class="topbar-submenu">
        <button type="button" role="menuitem" class="p-link">
          Prueba
        </button>
      </li>
      <li role="none" class="topbar-submenu">
        <button type="button" role="menuitem" class="p-link">
          Prueba2
        </button>
      </li>
      <li role="none" class="topbar-submenu">
        <button type="button" role="menuitem" class="p-link">
          Prueba3
        </button>
      </li>

    </ul> */