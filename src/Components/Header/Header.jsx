import React from 'react';
import { Navigator } from './../Navigator';
import { LogoHeader } from '../LogoHeader';



export const Header = () => {

  

  return (
    <div className="w-screen h-4rem bg-green-500">
      <LogoHeader className="w-8rem" />
      <Navigator />
      

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