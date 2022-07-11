import React from "react";
// import { getUser } from '../../helpers'
import { Image } from "primereact/image";
import foto_perfil from "../../assets/foto_perfil.jpg";

export const UserCard = () => {
  // getUser()

  // const usuario = getUser().then(data => {
  //     return data
  // })

  return (
    <div className="
      bg-yellow-200 flex justify-content-evenly flex-column 
      align-items-center card-container h-auto
    ">
        <Image 
          src={foto_perfil} 
          alt="Foto Usuario" 
          imageClassName="w-11rem"
          />
   
      <div>
        <p> Nombre:   <span> Alfredo Jiménez </span></p>
        <p> Correo:   <span> ejemplo@ejemplo.com </span></p>
        <p> Password: <span> 123456 </span></p>
      </div>
    </div>
  );
};
