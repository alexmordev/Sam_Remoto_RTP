
// ********Funcion para convertir pin de 4 numeros a ascii ********

import GetRequest from "../utils/GetRequest";
import PostRequest from "../utils/PostRequest";
import MakeRequest from "../utils/MakeRequest";

const changePinProcess = async(newPin) => {
  const start = Date.now();
    console.log('***Convirtiendo en ASCII***');
    const value_0 = newPin.charCodeAt(0);
    const value_1 = newPin.charCodeAt(1);
    const value_2 = newPin.charCodeAt(2);
    const value_3 = newPin.charCodeAt(3);
    const ascii_pin = `${value_0}${value_1}${value_2}${value_3}`
    console.log('New Pin Decimal: ', newPin);
    console.log('New Pin ASCII: ', ascii_pin);

    const applicationSN = await GetRequest("/selectApp");
    console.log("Select Aplication: ", applicationSN.serialNumber);
    const { SelectDiversifier } = await PostRequest(
      `${process.env.REACT_APP_DOMINIO}/diversifier`,
      {
        "applicationSN": `${applicationSN.serialNumber}`,
      }
    );
    console.log("Diversifier: ", SelectDiversifier.Status);

    const getChal = await GetRequest("/getChallenge");
    console.log("Get challenge: ", getChal.GetChallenge.Status);

    const { GiveRandom } = await PostRequest(
      `${process.env.REACT_APP_DOMINIO}/random`,
      { "challenge": `${getChal.GetChallenge.Response.slice(0, -4)}` }
    );
    console.log("Give Random: ", GiveRandom.Status);

    const cardCipher = await PostRequest(
      `${process.env.REACT_APP_DOMINIO}/cipherUpdate`,
      { "pin": `${ascii_pin}` }
    );
    console.log("CardCipher: ", cardCipher.response.Status);

    const { changePinResponse } = await PostRequest(`/changePin`, {
      "newPin": `${cardCipher.response.Response.slice(0, -4)}`,
    });
    console.log("Change Pin: ", changePinResponse.Status);

    console.log('********Verificar Pin *********');

    const getChal2 = await GetRequest("/getChallenge");
    console.log("Get challenge2: ", getChal2.GetChallenge.Status);

    const data = await PostRequest(
      `${process.env.REACT_APP_DOMINIO}/random`,
      { "challenge": `${getChal2.GetChallenge.Response.slice(0, -4)}` }
    );
    console.log("Give Random2: ", data.GiveRandom.Status);


    const cipherVerify = await PostRequest(
      `${process.env.REACT_APP_DOMINIO}/cipherVerify`,
      {"pin": `${ascii_pin}`}
    );
    console.log('cipherVerify: ', cipherVerify.response.Status );
  
    const saveCounters = await MakeRequest( 'http://dev-node.rtp.gob.mx:5000/insert/counters', 
                                        {
                                          "command": "Set PIN",
                                          "cardSN": `${applicationSN.serialNumber.slice(2)}`,
                                          "folio": "FOLIORTP/OFICIO/231"
                                        } );  
    console.log("Save Counters: ",saveCounters);
    let timer = Date.now() - start;
    console.log(timer);
}
export default changePinProcess;