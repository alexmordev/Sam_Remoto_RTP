
// ********Funcion para convertir pin de 4 numeros a ascii ********

import GetRequest from "../utils/GetRequest";
import PostRequest from "../utils/PostRequest";
import MakeRequest from "../utils/MakeRequest";

const changePinProcess = async(newPin) => {
  const start = Date.now();
  const url = process.env.REACT_APP_DOMINIO;
  // console.log('***Convirtiendo en ASCII***');
  // const value_0 = newPin.charCodeAt(0);
  // const value_1 = newPin.charCodeAt(1);
  // const value_2 = newPin.charCodeAt(2);
  // const value_3 = newPin.charCodeAt(3);
  // const ascii_pin = `${value_0}${value_1}${value_2}${value_3}`

  // console.log('New Pin Decimal: ', newPin);
  // console.log('New Pin ASCII: ', ascii_pin);

  const applicationSN = await GetRequest("/selectApp");
  const SelectDiversifier = await PostRequest(`${url}/diversifier`,{"applicationSN": `${applicationSN.serialNumber}`,});
  const getChallenge = await GetRequest("/getChallenge");
  const GiveRandom = await PostRequest(`${url}/random`,{ "challenge": `${getChallenge.response.slice(0,-4)}` });
  const cardCipher = await PostRequest(`${url}/cipherUpdate`,{ "pin": `${48484848}` });
  const changePinResponse = await PostRequest(`/changePin`, {"newPin": `${cardCipher.response.slice(0,-4)}`,});
  const getChallenge2 = await GetRequest("/getChallenge");
  const giveRandom = await PostRequest(`${url}/random`,{ "challenge": `${getChallenge2.response.slice(0, -4)}` });
  const cipherVerify = await PostRequest(`${url}/cipherVerify`,{"pin": `${48484848}`});
  const saveCounters = await MakeRequest( 'http://dev-node.rtp.gob.mx:5000/insert/counters', 
    {
      "command": "Set PIN",
      "cardSN": `${applicationSN.serialNumber.slice(2)}`,
      "folio": "FOLIORTP/OFICIO/231"
    } 
  );  
  let timer = Date.now() - start;
  console.group("Estableciendo PIN")
  console.log("Select Aplication: ", applicationSN.serialNumber);
  console.log("Diversifier: ", SelectDiversifier.status);
  console.log("Get challenge: ", getChallenge.status);
  console.log("Give Random: ", GiveRandom.status);
  console.log("CardCipher: ", cardCipher.status);
  console.log("Change Pin: ", changePinResponse.status);
  console.groupEnd();
  console.group('********Verificar Pin *********');
  console.log("Get challenge2: ", getChallenge2.status);
  console.log("Give Random2: ", giveRandom.status);
  console.log('cipherVerify: ', cipherVerify.status );
  console.log("Save Counters: ",saveCounters);
  console.log(timer);
  console.groupEnd();
  const objectResponse = [
        applicationSN,
        SelectDiversifier,
        getChallenge,
        GiveRandom,
        cardCipher,
        changePinResponse,
        getChallenge2,
        giveRandom,
        cipherVerify
      ]
  return objectResponse;
  }
export default changePinProcess;