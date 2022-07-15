//Logica para el cambio del PIN de la tarjeta

import selectAplication from '../selectAplication';
import diversifier from '../diversifier';
import getChallenge from '../getChallenge';
import giveRandom from '../giveRandom';
import cardCipherPinUpdate from '../cardCipherPinUpdate';
import changePin from '../changePin';



// Primero se ejecuta selectAplication al local serve el cual es un metodo GET, se obtiene el SN y se le agrega 08 al principio
// Se ejecuta diversifier al remote serve es un metodo POST y solo mostrar el status de esa operacion
// se ejecuta getChallenge al local serve es un metodo GET y se obtiene el Response.slice(a,-4)
// se ejectuva giveRandom al remote serve es un metodo POST y se le manda el response de getChallenge
// se ejecuta cardCipherPinUpdate al remote serve es un metodo post y se le manda en ascii el nuevo pin
// se ejecuta changePin al local serve es un metodo POST y se manda el response de cardCipherPinUpdate


const index = () => {

  const respSelectAplication = "0800000000946AD0F0";

  const respSelectionAp = selectAplication();

  diversifier( respSelectAplication );
  
  
  return (
    <div>
      
    </div>
  )
  
}

export default index


