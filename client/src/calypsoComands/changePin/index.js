//Logica para el cambio del PIN de la tarjeta

import selectAplication from '../selectAplication';
import diversifier from '../diversifier';
import getChallenge from '../getChallenge';
import giveRandom from '../giveRandom';
import cardCipherPinUpdate from '../cardCipherPinUpdate';
import changePin from '../changePin';

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


