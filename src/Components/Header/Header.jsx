import React from 'react';
import { LogoutButton } from '../LogoutButton';
import { Image } from 'primereact/image';
import { Menubar } from 'primereact/menubar';
import logo from '../../assets/rtp_sinlogo.png';
import { Link, useNavigate } from "react-router-dom";



export const Header = () => {

  const history = useNavigate();

  const inicioFunction = ( a ) => {
    

      switch (a) {
        case 0:
          <Link to="/homepage" />
          console.log('Inicio');
          break;
        case 1:
          <Link to="/app"/>
          console.log('App');
          break;
        case 2:
          <Link to="/dumps"/>
          console.log('Dumps');
          break;
        case 3:
          <Link to="/samcounters"/>
          console.log('SamCounters');
          break;
        
        default:
          break;
      }
      
  }


  const items = [
    {
      label: 'Inicio',
      command: () => {
        console.log('Inicio');
        history.push('/dumps');
      } 
    },
    {
      label: 'Aplicación',
      command: () => {
        inicioFunction(1);
      } 
    },
    {
      label: 'Gestión',
      items: [
        {
          label: 'Dumps',
          command: () => {
            inicioFunction(2);
          } 
        },
        {
          label: 'SAM',
          command: () => {
            inicioFunction(3);
          } 
        }
      ]
    }
  ]

  const start = <a href="https://www.rtp.cdmx.gob.mx/" target="blank">
                  <Image imageClassName='w-3rem' src={logo} alt="Logo RTP" />
                </a>

  const end = <Link to="/">
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