import Swal from "sweetalert2";

const errHandler = (title)=>{
  Swal.fire({
    title: `${title}`,
    timerProgressBar: true,
    didOpen: () => {
        Swal.fire(
            'Error de conexion ...',
            `Verificar contadores`,
            'error'
          );
    }
  });
}
export default  errHandler;