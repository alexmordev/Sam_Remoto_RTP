import GetRequest from "../utils/GetRequest";
import Swal from "sweetalert2";

export const SelectApplication = async()=>{
    const applicationSN = await GetRequest('/selectApp');
    //manejo de errores
    if(applicationSN.err){
        await Swal.fire(
        'Error en SelectApplication ',
        'Error de Conexion No incrementaron los Contadores',
        'error'
        )
    }else if(applicationSN.selectApp.Response.slice(-4) !== "9000"){
        await Swal.fire(
            `${applicationSN.selectApp.Status}`,
            'No incrementaron los Contadores',
            'error'
        )
    }else{
        return applicationSN.serialNumber;
    }
} 