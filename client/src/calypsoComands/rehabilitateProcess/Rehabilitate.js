import GetRequest from "../utils/GetRequest";
import PostRequest from "../utils/PostRequest";
import MakeRequest from "../utils/MakeRequest";

import Swal from "sweetalert2";
import { SelectApplication } from "./SelectApplication";

// let objectResponse ={}

const Rehabilitate = async() => {
    const start = Date.now();
    const dominio = process.env.REACT_APP_DOMINIO;

    const applicationSN = await GetRequest('/selectApp');
    // objectResponse['serialNumber'] = applicationSN;
    const diversifier = await PostRequest(`${dominio}/diversifier`,
                                        {
                                          "applicationSN": `${applicationSN.serialNumber}`
                                        });
                                        /*
    // objectResponse['diversifier'] = diversifier;
    const challenge = await GetRequest(`${dominio}/samChallenge`);
    const cleanChallenge = challenge.SamChallenge.Response.slice(0,-4);
    // objectResponse['challenge'] = challenge;

    
    
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
    */
    const objectResponse = {applicationSN, 
      diversifier, 
      };
console.log(objectResponse);
    return objectResponse;
}
const isLoading = ()=>{
  Swal.fire({
    title: `...`,
    timerProgressBar: true,
    didOpen: async() => {
      await Swal.showLoading()
      // const rehab = await Rehabilitate();
      const selectApp = await SelectApplication();
      if(!selectApp){
        console.log("FIN PROCESO");
      }else{
        console.log("diversifier");
      }
      // await Swal.fire(
      //   'Proceso Terminado',
      //   'Tarjeta Rehabilitada, Pin establecido, Contadores Guardados',
      //   'success'
      // )
      // await Swal.hideLoading()
      }
  })
}
export default  Rehabilitate;

/**
 try{
          const rehab = await Rehabilitate();
           await Swal.fire(
            'Proceso Terminado',
            'Tarjeta Rehabilitada, Pin establecido, Contadores Guardados',
            'success'
          )
          await Swal.hideLoading()

        }catch (error){
          await Swal.fire(
            'Error de Conexion',
            'Intenta de Nuevo...',
            'error'
          )
          console.log(error);
          await Swal.hideLoading()
        }

        else if(rehab.serialNumber.selectApp.Response.slice(-4) !== "9000"){
          await Swal.fire(
            `${rehab.serialNumber.selectApp.Status}`,
            'No incrementaron los Contadores',
            'error'
          )
        }else if(rehab.diversifier.err){
          await Swal.fire(
            'Error de Conexion Comando SelectDiversifier ',
            'No incrementaron los Contadores',
            'error'
          )
        }else if(rehab.diversifier.SelectDiversifier.Response.slice(-4) !== "9000"){
          await Swal.fire(
            `${rehab.diversifier.SelectDiversifier.Response}`,
            'No incrementaron los Contadores',
            'error'
          )
        }else if(rehab.challenge.err){
          await Swal.fire(
            'Error de Conexion Comando  GetSamChallenge',
            'No incrementaron los Contadores',
            'error'
          )
        }else if(rehab.challenge.SamChallenge.Status !== "9000"){
          await Swal.fire(
            `${rehab.challenge.SamChallenge.Status}`,
            'No incrementaron los Contadores',
            'error'
          )
        }
 */