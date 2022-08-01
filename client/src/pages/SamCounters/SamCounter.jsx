import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Container } from "../../Components/Container/Container";
// import { Header } from "../../Components/Header/Header";
import { TablaSam } from './../../Components/TablaSam';
import { getAuthorization } from './../../helpers/GetAuthorization';
import Swal from 'sweetalert2';
import { Card } from 'primereact/card';


export const SamCounter = () => {  

  const [condicion, setCondicion] = useState(false);

  const validar = async() => {

    const token = JSON.parse( localStorage.getItem( 'token' ));
    const url = `${process.env.REACT_APP_DOMINIO}/api/consultaContador`;
        
    const resp = await fetch(url, {
      method: 'get',
      headers: new Headers ({
        'Authorization': `jwt ${token}`
      })
    });
    const result = await resp.json();
    console.log('Result: ',result);
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
    <TablaSam/>
  </Card>
  {/* <div className="mb-8">
    <div className="flex  justify-content-center  ">

    </div>
    <div className="mb-8">
     
    </div>
  </div> */}
</Container>
);
};
