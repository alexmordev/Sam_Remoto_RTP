import React from 'react';
import { LogoutButton } from '../LogoutButton';
import { Avatar } from 'primereact/avatar';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";

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
      label: 'Sam Counters',
      icon: 'pi pi-table',
      command: () => {
        navigate('/samcounters');
      } 
    }
  ]

  const start = <Avatar className="mr-2" image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Logo_rtp_color_cuadro.png/239px-Logo_rtp_color_cuadro.png" size="large"></Avatar>
  
  const end = <LogoutButton/>

  return (
    <div className="px-3 py-2">
      <Menubar className='surface-overlay' start={start}  model={items} end={end}/>
    </div>
  )
}