import Swal from "sweetalert2";

const isLoading = async (response)=>{
  const [secuence, samCounters] = response;
  let counter = 0;
  let message = "";
  let status = "error";
  console.log(secuence);
  while(counter < secuence.length){
    if( secuence[counter].status !== "Correct Execution"){
      ( counter >= 4 )
        ?  message += `Contadores afectados<br>`
        :  message += `Contadores no afectados<br`; 
      break;
    }
    counter ++;
  }
  if(samCounters.status === "Correct Execution"){
    message += `<b>Contadores guardados<b><br>`
  }else{
    message += `<b>Contadores No guardados<b><br>`
  }
  if(counter === secuence.length){
    if( message.includes("Contadores guardados") ){
      status = "success";
    }
    await Swal.fire(
      'Proceso Terminado',
      `${message}`,
      `${status}`
    );
  }else{
    message += `Error en comando: <b>${secuence[counter].command}<b>`
    await Swal.fire(
      'Error en secuencia de comandos ...',
      `${message}`,
      `${status}`
    );
  }
}
export default  isLoading;