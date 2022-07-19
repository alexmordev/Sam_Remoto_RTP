// Metodo GET
// Servidor Local

import React from 'react';

const selectAplication = ( param ) => {

  const SendRequest = async()=>{
    const res = await fetch( param )
    if(!res)
      throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
  }

  const setPin = async() => {
    const selectApp = await SendRequest('/selectApp');
    console.log(selectApp.serialNumber);
    return {selectApp}
  };

  return (
    <div>selectAplication</div>
  )
}

export default selectAplication