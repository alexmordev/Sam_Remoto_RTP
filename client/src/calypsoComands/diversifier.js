// Metodo POST
// Servidor Remoto

import React from 'react';
import axios from 'axios';

const diversifier = async( param ) => {
  const url = 'http://dev-node.rtp.gob.mx:5000/diversifier';

  try {
    const { data } = await axios.post(
        url,
        {
            "applicationSN": param 
        }
    );
    console.log( data.SelectDiversifier.Status );
  } catch (error) {
    console.log(error)
  }

  return (
    <div>diversifier</div>
  )
}

export default diversifier



const fetchData = async( param ) => {

    

}