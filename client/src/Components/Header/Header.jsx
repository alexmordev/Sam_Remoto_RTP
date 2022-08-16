import React from 'react';
import { LogoutButton } from '../LogoutButton';
import { Avatar } from 'primereact/avatar';
import { Menubar } from 'primereact/menubar';
<<<<<<< HEAD

=======
>>>>>>> 60dad6087f9aa6d4a5a7c7c21a7fe5f02119a89a
import logo from '../../assets/rtp_sinlogo.png';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { getAuthorization } from '../../helpers/GetAuthorization';

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
      items: [
        {
          label: 'Pin',
          icon: 'pi pi-th-large',
          command: () => {
            navigate('/app');
          } 
        },
        {
          label: 'Rehabilitar',
          icon: 'pi pi-th-large',
          command: () => {
            navigate('/rehabilitate');
          } 
        }
      ]
    },
    {
      label: 'Sam Counters',
      icon: 'pi pi-table',
      command: () => {
        navigate('/samcounters');
      } 
    }
  ];

  const start = <Avatar className="mr-2" image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Logo_rtp_color_cuadro.png/239px-Logo_rtp_color_cuadro.png" size="large"></Avatar>
  
  const end = <LogoutButton/>

  return (
    <div className="px-3 py-2">
      <Menubar className='surface-overlay' start={start}  model={items} end={end}/>
    </div>
  )
}