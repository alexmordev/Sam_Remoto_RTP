// Metodo GET
// Servidor Local


import React from 'react';

const selectAplication = async( param ) => {
  const url = 'urllocal';

  try {
    const resp = await fetch(url);
    const { results } = await resp.json()
  } catch (error) {
    console.log(error)
  }


  return (
    <div>selectAplication</div>
  )
}

export default selectAplication