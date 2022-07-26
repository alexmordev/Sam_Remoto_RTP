import GetRequest from "../utils/GetRequest";
import PostRequest from "../utils/PostRequest";
import MakeRequest from "../utils/MakeRequest";

const ChangePinSequence = async(newPin) => {
  try{
    const start = Date.now();
    const url = process.env.REACT_APP_DOMINIO;
    const value_0 = newPin.charCodeAt(0).toString(16);
    const value_1 = newPin.charCodeAt(1).toString(16);
    const value_2 = newPin.charCodeAt(2).toString(16);
    const value_3 = newPin.charCodeAt(3).toString(16);
    const pinHexa = `${value_0}${value_1}${value_2}${value_3}`
  
    const applicationSN = await GetRequest("/selectApp");
    // const Unlock = await GetRequest("/unlock");
    const SelectDiversifier = await PostRequest(`${url}/diversifier`,{"applicationSN": `${applicationSN.serialNumber}`,});
    const getChallenge = await GetRequest("/getChallenge");
    const GiveRandom = await PostRequest(`${url}/random`,{ "challenge": `${getChallenge.response.slice(0,-4)}` });
    const cardCipher = await PostRequest(`${url}/cipherUpdate`,{ "pin": `${pinHexa}` });
    const changePinResponse = await PostRequest(`/changePin`, {"newPin": `${cardCipher.response.slice(0,-4)}`,});
    const saveCounters = await MakeRequest( `${url}/insert/counters`, 
      {
        "cardSN": `${applicationSN.serialNumber.slice(2)}`,
        "secuencia": "SET PIN",
        "userId": `${localStorage.getItem( 'id' )}`
      }
    );  
    const getChallenge2 = await GetRequest("/getChallenge");
    const giveRandom = await PostRequest(`${url}/random`,{ "challenge": `${getChallenge2.response.slice(0, -4)}` });
    const cipherVerify = await PostRequest(`${url}/cipherVerify`,{"pin": `${pinHexa}`});
    
    const objectResponse = [
          applicationSN,
          // Unlock,
          SelectDiversifier,
          getChallenge,
          GiveRandom,
          cardCipher,
          changePinResponse,
          getChallenge2,
          giveRandom,
          cipherVerify
    ];
    console.group("Estableciendo PIN");
    console.log(objectResponse);
    console.log(saveCounters);
    console.log(Date.now() - start);
    console.groupEnd();
    return [objectResponse, saveCounters];

  }
  catch(err){
    throw err;
  }
}
export default ChangePinSequence;