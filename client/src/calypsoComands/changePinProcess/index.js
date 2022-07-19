//Logica para el cambio del PIN de la tarjeta

import getChallenge from '../getChallenge';
import giveRandom from '../giveRandom';
import cardCipherPinUpdate from '../cardCipherPinUpdate';
import selectAplication from './../selectAplication';
import diversifier from './../diversifier';
import changePin from './../changePin';



// Primero se ejecuta selectAplication al local serve el cual es un metodo GET, se obtiene el SN y se le agrega 08 al principio
// Se ejecuta diversifier al remote serve es un metodo POST y solo mostrar el status de esa operacion
// se ejecuta getChallenge al local serve es un metodo GET y se obtiene el Response.slice(a,-4)
// se ejectuva giveRandom al remote serve es un metodo POST y se le manda el response de getChallenge
// se ejecuta cardCipherPinUpdate al remote serve es un metodo post y se le manda en ascii el nuevo pin
// se ejecuta changePin al local serve es un metodo POST y se manda el response de cardCipherPinUpdate


const index = () => {

  const dominio = process.env.REACT_APP_DOMINIO;
  const newPin = '48454845';

  const change = async () => {

    const selectApp = await selectAplication('/selectApp');
    console.log('SelectApp: ',selectApp);


    const diversif = await diversifier(`${dominio}/diversifier`, {"applicationSN" : `${selectApp}`})
    console.log('Diversifier: ',diversif);

    const getChal = await getChallenge('/getChallenge');
    console.log('Get Challenge: ',getChal)

    const giveRan = await giveRandom(`${dominio}/random`, {'challenge': `${getChal}`});
    console.log('GiveRandom: ',giveRan);

    const cardCipher = await cardCipherPinUpdate(`${dominio}/cipherUpdate`, { "pin": `${newPin}` })
    console.log('CardCipher: ',cardCipher);

    const changeP = await changePin(`/changePin`, {'newPin': `${cardCipher}` })
    console.log('Change Pin: ',changeP)

  }
  
  change();
}

export default index


