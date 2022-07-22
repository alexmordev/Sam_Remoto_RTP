import GetRequest from "../utils/GetRequest";
import PostRequest from "../utils/PostRequest";

const Rehabilitate = async() => {
    const start = Date.now();
    const applicationSN = await GetRequest('/selectApp');
    const diversifier = await PostRequest('http://dev-node.rtp.gob.mx:5000/diversifier',
                                        {
                                          "applicationSN": `${applicationSN.serialNumber}`
                                        });
    const challenge = await GetRequest('http://dev-node.rtp.gob.mx:5000/samChallenge');
    const cleanChallenge = challenge.SamChallenge.Response.slice(0,-4);
    const oppenSecure = await PostRequest('/oppenSecureSession', 
                                        {
                                          "challenge":`${cleanChallenge}` 
                                        });
    const cleanOppenSecure = oppenSecure.OpenSecureSession.Response.slice(0,-4);                                  
    const digestInit = await PostRequest('http://dev-node.rtp.gob.mx:5000/digestInit',
                                        {
                                          "secureSession":`${cleanOppenSecure}`
                                        });
    const rehabilitate = await GetRequest('/rehabilitate');
    // const cleanRehabilitate = rehabilitate.
    const digestUpdate1 =  await PostRequest('http://dev-node.rtp.gob.mx:5000/digestUpdate',
                                        {
                                          "digestData":`0044000000`
                                        });
    const digestUpdate2 =  await PostRequest('http://dev-node.rtp.gob.mx:5000/digestUpdate',
                                        {
                                          "digestData":`${digestUpdate1.DigestUpdate.Response.slice(-4)}`
                                        });
    const digestClose = await GetRequest('http://dev-node.rtp.gob.mx:5000/digestClose');
    const cleanCloseDigest = digestClose.DigestClose.Response.slice(0,-4);
    const closeSecure = await PostRequest('/closeSecureSession', 
                                        {
                                          "digestClose":`${cleanCloseDigest}`
                                        });
    const authenticate = await PostRequest('http://dev-node.rtp.gob.mx:5000/digestAuthenticate', 
                                        {
                                          "signature":`${closeSecure.CloseSecureSession.Response.slice(0,-4)}`
                                        });
                                                                            
    const ratificaton = await GetRequest( '/ratification' )                                  

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
                          timer};
    console.log(objectResponse);
    return objectResponse;
}
export default  Rehabilitate;