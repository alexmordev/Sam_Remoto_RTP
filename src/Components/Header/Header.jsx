import React from 'react';
import { LogoutButton } from '../LogoutButton';
import { Image } from 'primereact/image';
import { Menubar } from 'primereact/menubar';
import logo from '../../assets/rtp_sinlogo.png';



export const Header = () => {
  const items = [
    {
      label: 'Inicio',
    },
    {
      label: 'Aplicación',
    },
    {
      label: 'Gestión',
      items: [
        {
          label: 'Dumps',
          icon: 'pi-angle-right',
        },
        {
          label: 'SAM',
          icon: 'pi-angle-right',
        }
      ]
    }
  ]

  const start =  <Image imageClassName='w-3rem' src={logo} alt="Logo RTP" />

    

  return (
    <div className="w-screen h-4rem ">

      <Menubar className='border-3 border-green-200 w-screen absolute top-0 right-0' start={start}  model={items} end={<LogoutButton/>}/>

      

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