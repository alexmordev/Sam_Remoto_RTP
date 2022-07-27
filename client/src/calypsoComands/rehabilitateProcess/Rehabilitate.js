import GetRequest from "../utils/GetRequest";
import PostRequest from "../utils/PostRequest";
import MakeRequest from "../utils/MakeRequest";

const Rehabilitate = async() => {
    const start = Date.now();
    const applicationSN = await GetRequest('/selectApp');
    const diversifier = await PostRequest(`${process.env.REACT_APP_DOMINIO}/diversifier`,
                                        {
                                          "applicationSN": `${applicationSN.serialNumber}`
                                        });
    const challenge = await GetRequest(`${process.env.REACT_APP_DOMINIO}/samChallenge`);
    const cleanChallenge = challenge.SamChallenge.Response.slice(0,-4);
    const oppenSecure = await PostRequest('/oppenSecureSession', 
                                        {
                                          "challenge":`${cleanChallenge}` 
                                        });
    const cleanOppenSecure = oppenSecure.OpenSecureSession.Response.slice(0,-4);                                  
    const digestInit = await PostRequest(`${process.env.REACT_APP_DOMINIO}/digestInit`,
                                        {
                                          "secureSession":`${cleanOppenSecure}`
                                        });
    const rehabilitate = await GetRequest('/rehabilitate');
    // const cleanRehabilitate = rehabilitate.
    const digestUpdate1 =  await PostRequest(`${process.env.REACT_APP_DOMINIO}/digestUpdate`,
                                        {
                                          "digestData":`0044000000`
                                        });
    const digestUpdate2 =  await PostRequest(`${process.env.REACT_APP_DOMINIO}/digestUpdate`,
                                        {
                                          "digestData":`${digestUpdate1.DigestUpdate.Response.slice(-4)}`
                                        });
    const digestClose = await GetRequest(`${process.env.REACT_APP_DOMINIO}/digestClose`);
    const cleanCloseDigest = digestClose.DigestClose.Response.slice(0,-4);
    const closeSecure = await PostRequest('/closeSecureSession', 
                                        {
                                          "digestClose":`${cleanCloseDigest}`
                                        });
    const authenticate = await PostRequest(`${process.env.REACT_APP_DOMINIO}/digestAuthenticate`, 
                                        {
                                          "signature":`${closeSecure.CloseSecureSession.Response.slice(0,-4)}`
                                        });
                                                                            
    const ratificaton = await GetRequest( '/ratification' )   
    const saveCounters = await MakeRequest( 'http://dev-node.rtp.gob.mx:5000/insert/counters', 
                                        {
                                          "command": "Rehabilitate",
                                          "cardSN": `${applicationSN.serialNumber.slice(2)}`,
                                          "folio": "FOLIORTP/OFICIO/231"
                                        } );                              

    const timer = Date.now() - start;

    const objectResponse = {applicationSN, 
                          diversifier, 
                          challenge, 
                          oppenSecure, 
                          digestInit, 
                          rehabilitate,
                          digestUpdate1, 
                          digestUpdate2,
                          digestClose,
                          closeSecure, 
                          authenticate,
                          ratificaton,
                          saveCounters,
                          timer};
    console.log(objectResponse);
    return objectResponse;
}
export default  Rehabilitate;