//Metodo POST
//Servidor Local

import React from 'react'

const changePin = async(url, object) => {
  
  const res = await fetch(url,{
    method:'POST',
    body:JSON.stringify(object),
    headers:{
      'Content-Type': 'application/json'
  }
  })
  if(!res)
    throw new Error("WARN", res.status);
  const {changePinResponse} = await res.json();
  return changePinResponse.Status;
}



export default changePin