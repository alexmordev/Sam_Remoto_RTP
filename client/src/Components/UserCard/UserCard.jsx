import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import foto_perfil from "../../assets/foto_perfil.jpg";
// import { getUser } from "../../helpers/getUser";

export const UserCard = () => {
  // const [nombre, setNombre] = useState('');
  // const [correo, setCorreo] = useState('');
  // const [worker, setWorker] = useState('');
  // const [image , setImage ] = useState('');

  // useEffect(() => {
  //   const usuario = getUser().then(( data ) => {
  //     setNombre(data[0].name.first);
  //     setCorreo(data[0].email);
  //     setWorker(data[0].login.password);
  //     setImage( data[0].picture.large );
  //   });
  // }, [])

  return (
    <div
      className="
      flex justify-content-evenly flex-column 
      align-items-center  
    "
    >
      <Image
        //  src={ image }
        src={foto_perfil}
        alt="Foto Usuario"
        imageClassName="w-14rem border-round"
      />

      <div className="flex flex-column align-items-center ">
        <p id="nombre_p" 
          className="
            text-3xl 
            font-medium 
            text-white
        ">
          {/* { nombre } */}
          Alfredo Jiménez
        </p>
        <p id="correo_p" 
          className="
            text-3xl 
            font-medium 
            text-white
        ">
          {/* { correo } */}
          ejemplo@ejemplo.com
        </p>
        <p id="worker_p" 
          className="
            text-3xl font-medium 
            text-white
        ">
          {/* { worker }  */}
          012345678
        </p>
      </div>
    </div>
  );
};
