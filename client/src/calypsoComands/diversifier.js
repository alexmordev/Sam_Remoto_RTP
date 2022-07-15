// Metodo POST
// Servidor Remoto

import axios from 'axios';

const diversifier = ( param ) => {

  const url = `${process.env.REACT_APP_DOMINIO}/diversifier`;
  // const url = `http://dev-node.rtp.gob.mx:5000/diversifier`;
  let status;

  const fetchData = async() => {

    try {
      const { data } = await axios.post(
          url,
          {
              "applicationSN": param 
          }
        );
        status = data.SelectDiversifier.Status ;
      // console.log( data.SelectDiversifier.Status );
    } catch (error) {
        status =  error;
    }

  }

  fetchData();

  console.log('Valor de status: ',status);
  
  return status
}

export default diversifier


