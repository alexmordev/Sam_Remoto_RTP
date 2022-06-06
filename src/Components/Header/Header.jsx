import React from 'react';
import { LogoutButton } from '../LogoutButton';
import { Image } from 'primereact/image';
import { Menubar } from 'primereact/menubar';
import logo from '../../assets/rtp_sinlogo.png';
import { Link } from "react-router-dom";




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
        },
        {
          label: 'SAM',
        }
      ]
    }
  ]

  const start = <a href="https://www.rtp.cdmx.gob.mx/" target="blank">
                  <Image imageClassName='w-3rem' src={logo} alt="Logo RTP" />
                </a>

  const end = <Link to="/login">
                <LogoutButton/>
              </Link>
    

  return (
    <div className="relative w-full h-4rem ">

      <Menubar className='border-3 h-4rem border-green-200 w-screen top-0 right-0' start={start}  model={items} end={end}/>

      

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