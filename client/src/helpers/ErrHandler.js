import Swal from "sweetalert2";

const errHandler = (title, err)=>{
  Swal.fire({
    title: `${title}`,
    timerProgressBar: true,
    didOpen: () => {
        Swal.fire(
            'Error de conexion ...',
            `Verificar contadores<br> ${err} <br>`,
            'error'
          );
    }
  });
}
export default  errHandler;