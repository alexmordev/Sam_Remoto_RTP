import Swal from "sweetalert2";
import Rehabilitate from "../calypsoComands/rehabilitateProcess/Rehabilitate";
import changePinProcess from "../calypsoComands/changePinProcess/changePinProcess";
import GetRequest from "../calypsoComands/utils/GetRequest";
import PostRequest from "../calypsoComands/utils/PostRequest";
import { getValidation } from "../calypsoComands/utils/DataValidation";
import MakeRequest from "../calypsoComands/utils/MakeRequest";


const isLoading = (title)=>{
    Swal.fire({
      title: `${title}`,
      timerProgressBar: true,
      didOpen: async() => {
        await Swal.showLoading()
        const url = process.env.REACT_APP_DOMINIO;
        let counter = 0;
        let message = "";
        const df = await GetRequest('/selectCurrentDF');
        if( df.applicationStatus === "00" ){
          const rehab = await Rehabilitate();
          while(counter < rehab.length){
            if( rehab[counter].status !== "Correct Execution"){
              ( counter >= 4 )
                ?  message += `Contadores afectados<br>`
                :  message += `Contadores no afectados<br`; 
              break;
            }
            counter ++;
          }
          if(counter === rehab.length){
            message += "Tarjeta Rehabilitada<br>";
            let saveCounters = await MakeRequest( `${url}/insert/counters`,{
              "command": "Rehabilitate",
              "cardSN": `${rehab[0].serialNumber.slice(2)}`, 
              "folio": "FOLIORTP/OFICIO/231"
            });
            console.log(saveCounters);
            if( saveCounters.status === "Correct Execution"){
              message += "Contadores guardados<br>";
              counter = 0;
              const changePin = await changePinProcess();
              while(counter < changePin.length){
                if( changePin[counter].status !== "Correct Execution"){
                  ( counter >= 4 )
                    ?  message += `Contadores afectados<br>.`
                    :  message += `Contadores no afectados<br>.`; 
                  break;
                }
                counter ++;
              }
              if(counter === changePin.length){
                message += "PIN Establecido Correctamente<br>";
                saveCounters = await MakeRequest( `${url}/insert/counters`,{
                  "command": "Rehabilitate",
                  "cardSN": `${rehab[0].serialNumber.slice(2)}`, 
                  "folio": "FOLIORTP/OFICIO/231"
                });
                console.log(saveCounters);
                if( saveCounters.status === "Correct Execution" ){
                  message += "Contadores guardados";
                  await Swal.fire(
                    'Proceso Terminado',
                    `${message}`,
                    'success'
                  )
                }else{
                  message += "Contadores NO guardados";
                  await Swal.fire(
                    'Error Guardando Contadores',
                    `${message}`,
                    'error'
                  )
                }
              }else if( counter >= 4){
                let saveCounters = await MakeRequest( `${url}/insert/counters`,{
                  "command": "SetPin",
                  "cardSN": `${rehab[0].serialNumber.slice(2)}`, 
                  "folio": "FOLIORTP/OFICIO/231"
                });
                console.log(saveCounters);
                if( saveCounters.status === "Correct Execution" ){
                  message += "<b>Contadores guardados<b><br>";
                }else{
                  message +=  "<b>Contadores NO guardados<b><br>";
                }
                message += "ERROR Estableciendo PIN";
                await Swal.fire(
                  'Error Estableciendo PIN',
                  `${message}`,
                  'error'
                )
              }else{
                message += `Error en comando: <b>${changePin[counter].command}<b>`
                await Swal.fire(
                  'Error Estableciendo PIN...',
                  `${message}`,
                  'error'
                );
              }
            }else{
              message += "<b>Contadores No guardados<br>";
              await Swal.fire(
                'Error Guardando Contadores',
                `${message}`,
                'error'
              )
            }
          }else if(  counter >= 4 ){
            let saveCounters = await MakeRequest( `${url}/insert/counters`,{
              "command": "Rehabilitate",
              "cardSN": `${rehab[0].serialNumber.slice(2)}`, 
              "folio": "FOLIORTP/OFICIO/231"
            });
            if( saveCounters.status === "Correct Execution" ){
              message += "<b>Contadores guardados<b><br>";
            }else{
              message +=  "<b>Contadores NO guardados<b><br>";
            }
            message += `Error en comando: <b>${rehab[counter].command}<b>`
            await Swal.fire(
              'Error Rehabilitando tarjeta ...',
              `${message}`,
              'error'
            );
          }else{
            message += `Error en comando: <b>${rehab[counter].command}<b>`
            await Swal.fire(
              'Error Rehabilitando tarjeta ...',
              `${message}`,
              'error'
            );
          }
        }else{
            const changePin = await changePinProcess();
            while(counter < changePin.length){
              if( changePin[counter].status !== "Correct Execution"){
                ( counter >= 4 )
                  ?  message += `Contadores afectados<br>.`
                  :  message += `Contadores no afectados<br>.`; 
                break;
              }
              counter ++;
            }
            if(counter === changePin.length){
              message += "PIN Establecido Correctamente<br>";
              let saveCounters = await MakeRequest( `${url}/insert/counters`,{
                "command": "Rehabilitate",
                "cardSN": `Information pending..`, 
                "folio": "FOLIORTP/OFICIO/231"
              });
              console.log(saveCounters);
              if( saveCounters.status === "Correct Execution" ){
                message += "Contadores guardados";
                await Swal.fire(
                  'Proceso Terminado',
                  `${message}`,
                  'success'
                )
              }else{
                message += "Contadores NO guardados";
                await Swal.fire(
                  'Error Guardando Contadores',
                  `${message}`,
                  'error'
                )
              }
            }else if( counter >= 4){
              let saveCounters = await MakeRequest( `${url}/insert/counters`,{
                "command": "SetPin",
                "cardSN": `Information pending`, 
                "folio": "FOLIORTP/OFICIO/231"
              });
              console.log(saveCounters);
              if( saveCounters.status === "Correct Execution" ){
                message += "<b>Contadores guardados<b><br>";
              }else{
                message +=  "<b>Contadores NO guardados<b><br>";
              }
              message += "ERROR Estableciendo PIN";
              await Swal.fire(
                'Error Estableciendo PIN',
                `${message}`,
                'error'
              )
            }else{
              message += `Error en comando: <b>${changePin[counter].command}<b>`
              await Swal.fire(
                'Error Estableciendo PIN...',
                `${message}`,
                'error'
              );
            }
        }
      }
    })
}
export default  isLoading;

  /**
 * verificar currentDF
 *  si CurrentDF != 00  => correr rehabilitate
 *    Si rehabilitate 9000 => partial success message, correr SaveCounters
 *      Si SC = 9000 => correr SetPin
 *        Si SetPin = 9000 => partial success message, correr SaveCounters
 *          Si Sc == 9000 => Success Message, Card Rehab, Rehab counters saved,Card SetPin, Set Pin saved 
 *          Si SC != 9000 => err message
 *        Si SetPin != 9000 => error message,Card Rehab, sRehab counters saved,SetPin Counters didn't increase 
 *    Si rehabilitate != 9000 => error message, Counters didn't increase 

 *  si es CurrentDF = 00 => correr SetPin
 *    Si setPIN 9000 =>partial success message
 *      Si SaveCounters = 9000 => success message, Counters saved
 *      Si SC != 9000 => Pin set, Counters don't saved
 *    Si setPin != 9000=> error message, Counters didn't increase
 * 
 *  
 */
