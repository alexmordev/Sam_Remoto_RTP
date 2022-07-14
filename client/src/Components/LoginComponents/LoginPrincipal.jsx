import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Imagen } from "./Imagen";
import { getAuthorization } from "../../helpers/GetAuthorization";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPrincipal = () => {

  const url = 'http://dev-node.rtp.gob.mx:5000/api/login';

  const navegacion = useNavigate();

  const [userValue, setUserValue] = useState( "" ); //Aqui se almacenará el valor del correo de usuario
  const [passValue, setPassValue] = useState( "" ); //Aqui se almacenará el valor de la contraseña
  const [sendData, setSendData]   = useState( true ); //Esta unicamente es una condición para que 
  const [timer, setTimer] = useState( true );
   
  useEffect(() => {
    fetchData()
  }, [sendData])
  
  useEffect(() => {
    setTimer(false);
  }, [])
  

  const fetchData = async() => {

    try {
      const { data } = await axios.post(
        url,
        {
          // "email": user,
          "email": userValue,
          "password": passValue
          // "password": passUser
        }
      );
      localStorage.setItem('token', JSON.stringify(data.token));
      navegacion( '/homepage' );
    } catch (error) {
      console.log('Algo salio mal');
      navegacion( '/' );
      
    }
  }
  
  const validacion = () => {
    setSendData( !sendData );
  };

  if (timer === true) {
    return <p> Cargando </p>
  }
  return (
    <div className="bg-bluegray-300 h-screen w-screen flex align-items-center justify-content-center ">
      <div className=" h-30rem w-30rem flex  align-items-center  flex-column justify-content-around">
        <Imagen />
        <span className="p-float-label">
          <InputText
            className="w-18rem h-4rem"
            id="username"
            value={userValue}
            onChange={(e) => setUserValue(e.target.value)}
          />
          <label htmlFor="username">Usuario</label>
        </span>

        <span className="p-float-label">
          <Password
            inputClassName="w-18rem h-4rem"
            feedback={false}
            value={passValue}
            onChange={(e) => setPassValue(e.target.value)}
            toggleMask
          />
          <label htmlFor="password">Contraseña</label>
        </span>

        <Button
          label="Ingresar"
          icon="pi pi-sign-in"
          className="p-button-success"
          onClick={ validacion }
        />
      </div>
    </div>
  );
};
