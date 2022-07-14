//Metodo POST
// Servidor remoto

import React from 'react'
import axios from 'axios';

const giveRandom = async( param ) => {

  const url = 'http://dev-node.rtp.gob.mx:5000/random'; 


  try {
    const { data } = await axios.post(
        url,
        {
            "challange": param 
        }
    );
    console.log( data.SelectDiversifier.Status );
  } catch (error) {
    console.log(error)
  }

  return (
    <div>giveRandom</div>
  )
}

export default giveRandom