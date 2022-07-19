// Metodo GET 
// Servidor local

import React from 'react'

const getChallenge = async(url) => {
  
  const SendRequest = async()=>{
    const res = await fetch( url )
    if(!res)
      throw new Error("WARN", res.status);
    const {GetChallenge} = await res.json();
    return GetChallenge.Response;
  }

    const respGetChallenge = await SendRequest('/selectApp');
    return respGetChallenge.slice(0,-4)

}

export default getChallenge