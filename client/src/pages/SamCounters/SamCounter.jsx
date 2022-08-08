import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Container } from "../../Components/Container/Container";
// import { Header } from "../../Components/Header/Header";
import { TablaSam } from './../../Components/TablaSam';
import { getAuthorization } from './../../helpers/GetAuthorization';
import Swal from 'sweetalert2';
import { Card } from 'primereact/card';
import TablaSam2 from "../../Components/TablaSam/TablaSam2";


export const SamCounter = () => {  

  const [condicion, setCondicion] = useState(false);

  const validar = async() => {

    const token = JSON.parse( localStorage.getItem( 'token' ));
    const url = `http://localhost:5000/api/consultaContador`;
        
    const resp = await fetch(url, {
      method: 'get',
      headers: new Headers ({
        'Authorization': `jwt ${token}`
      })
    });
    const result = await resp.json();
    const {categories} = result

    if (categories) {
      setCondicion(true);
      
    } else {
      setCondicion(false);
    }
  }

  

  useEffect(() => {
    validar()
  }, []);




  return (


<Container>
  <Card title="Contadores del SAM">
    {(condicion === true)? <TablaSam2/> : <p>No tienes permiso de administrador</p> }
    {/* {(condicion === true)? <TablaSam/> : <p>No tienes permiso de administrador</p> } */}
    
  </Card>
  
</Container>
);
};
