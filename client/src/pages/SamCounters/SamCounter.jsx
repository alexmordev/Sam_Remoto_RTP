import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Container } from "../../Components/Container/Container";
// import { Header } from "../../Components/Header/Header";
import { TablaSam } from './../../Components/TablaSam';
import { getAuthorization } from './../../helpers/GetAuthorization';
import Swal from 'sweetalert2';


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
  <div className="w-screen h-screen mb-8">
    
    <div className="mt-4 mb-5 bg-green-300 w-full h-4rem flex justify-content-center align-items-center">
      <p className="text-white-alpha-90 font-bold text-3xl">Tabla General</p>
    </div>
    <div className="flex  justify-content-center  ">
      {(condicion === true)?  <TablaSam /> : <p className="text-red-600 text-base text-center">No eres administrador </p>}
    </div>
    <div className="mb-8">
     
    </div>
  </div>
</Container>
);
};
