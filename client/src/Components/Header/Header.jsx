import React from 'react';
import { LogoutButton } from '../LogoutButton';
import { Image } from 'primereact/image';
import { Menubar } from 'primereact/menubar';
import logo from '../../assets/rtp_sinlogo.png';
import { Link, useNavigate } from "react-router-dom";



export const Header = () => {

  const navigate = useNavigate();

  
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => {
        navigate('/homepage');
      } 
    },
    {
      label: 'Aplicación',
      icon: 'pi pi-th-large',
      command: () => {
        navigate('/app');
      } 
    },
    {
      label: 'Gestión',
      icon: 'pi pi-list',
      items: [
        {
          label: 'Dumps',
          icon: 'pi pi-table',
          command: () => {
            navigate('/dumps');
          } 
        },
        {
          label: 'SAM',
          icon: 'pi pi-table',
          command: () => {
            navigate('/samcounters');
          } 
        }
      ]
    }
  ]

  const start = <a href="https://www.rtp.cdmx.gob.mx/" target="blank">
                  <Image className='ml-3' imageClassName='w-3rem' src={logo} alt="Logo RTP" />
                </a>

  const end = <Link to="/">
                <LogoutButton/>
              </Link>
  const customStyle = "border-radius: 0px;"

  return (
    <div className="relative w-full h-4rem ">

      <Menubar className='surface-overlay py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static' start={start}  model={items} end={end}/>

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