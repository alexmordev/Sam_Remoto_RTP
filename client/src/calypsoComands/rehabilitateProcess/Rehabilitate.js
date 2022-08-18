import GetRequest from "../utils/GetRequest";
import MakeRequest from "../utils/MakeRequest";
import PostRequest from "../utils/PostRequest";

const Rehabilitate = async() => {
  try{
    const start = Date.now();
    const url = process.env.REACT_APP_DOMINIO;
    const applicationSN = await GetRequest('/selectApp');
    const diversifier = await PostRequest(`${url}/diversifier`,{"applicationSN": `${applicationSN.serialNumber}`});
    const challenge = await GetRequest(`${url}/samChallenge`);
    const openSecure = await PostRequest('/oppenSecureSession', {"challenge":`${challenge.response.slice(0,-4)}` });        
    const digestInit = await PostRequest(`${url}/digestInit`,{"secureSession":`${openSecure.response.slice(0,-4)}`});
    const rehabilitate = await GetRequest('/rehabilitate');
    const digestUpdate1 = await PostRequest(`${url}/digestUpdate`,{"digestData":`0044000000`});
    const digestUpdate2 = await PostRequest(`${url}/digestUpdate`,{"digestData":`${digestUpdate1.response.slice(-4)}`});
    const digestClose = await GetRequest(`${url}/digestClose`);
    const closeSecure = await PostRequest('/closeSecureSession', {"digestClose":`${digestClose.response.slice(0,-4)}`});
    
    const authenticate = await PostRequest(`${url}/digestAuthenticate`, {"signature":`${closeSecure.response.slice(0,-4)}`});
    const saveCounters = await MakeRequest( 'http://dev-node.rtp.gob.mx:5000/insert/counters', 
      {
        "cardSN": `${applicationSN.serialNumber.slice(2)}`,
        "sequence": "REHABILITATE",
        "userId": "USER"
      } 
    );
    const ratificaton = await GetRequest( '/ratification' ) 
  
    const secuence = [
      applicationSN, 
      diversifier, 
      challenge, 
      openSecure, 
      digestInit, 
      rehabilitate,
      digestUpdate1, 
      digestUpdate2,
      digestClose,
      closeSecure, 
      authenticate,
      ratificaton,
    ];
    console.group("Running Rehabilitate");
    console.log(secuence);
    console.log( saveCounters );
    console.log(applicationSN.serialNumber.slice(2));
    console.log( Date.now() - start);
    console.groupEnd();
    return [secuence, saveCounters];
  }catch( err ){
    throw err;
  }  
}

export default  Rehabilitate;
/**
 *   console.group("Running Rehabilitate");
  console.log(applicationSN);
  console.log(diversifier);
  console.log(challenge);
  console.log(openSecure);
  console.log(digestInit);
  console.log(rehabilitate);
  console.log(digestUpdate1);
  console.log(digestUpdate2);
  console.log(digestClose);
  console.log(closeSecure);
  console.log(authenticate);
  console.log(ratificaton);
  console.log( Date.now() - start);
  console.groupEnd();

 */