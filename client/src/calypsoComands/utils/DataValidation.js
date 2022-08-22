import Swal from "sweetalert2";

export const getValidation= async(object)=>{
    if(object.status !== "Correct Execution"){
        await Swal.fire(
            `Error en comando ${object.command}`,
            `${object.status}`,
            'error'
        )
    }else{
        return 'ok';
    }
}