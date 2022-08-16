import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { getAuthorization } from "../../helpers/GetAuthorization";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../auth/context/AuthContext";
import Swal from 'sweetalert2';

export const LoginPrincipal = () => {
  const { login } = useContext(AuthContext)

  const url = `${process.env.REACT_APP_DOMINIO}/api/login`;

  const navigate = useNavigate();

  const [userValue, setUserValue] = useState(""); //Aqui se almacenará el valor del correo de usuario
  const [passValue, setPassValue] = useState(""); //Aqui se almacenará el valor de la contraseña
  const [sendData, setSendData] = useState(true); //Esta unicamente es una condición para que 
  const [timer, setTimer] = useState(true);

  

  useEffect(() => {
    setTimer(false);
  }, [])

  const fetchData = async () => {

    try {
      const { data } = await axios.post(
        url,
        {

          "email": userValue,
          "password": passValue
       
        }
      );
      login("email", "password")
      localStorage.setItem('token', JSON.stringify(data.token));
      navigate('/homepage');
    } catch (e) {
      Swal.fire({
        title: `Error`,
        text: `${e.response.data.message}`,
        icon: 'error',
      });
      console.log(e.response.data);
    }
  }

  if (timer === true) {
    return <p> Cargando </p>
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();
    fetchData();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="surface-ground px-8 py-8 flex align-content-center flex-wrap justify-content-center">
          <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
            <div className="text-center mb-5">
              <div className="grid -mt-3 -ml-3 -mr-3">
                <div className="col-12 md:col-12 lg:col-12">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_RTP_y_Movilidad_Integrada.png/320px-Logo_RTP_y_Movilidad_Integrada.png" alt="Image" width="250" />
                </div>
              </div>
              <div className="text-900 text-3xl font-medium mb-3">Iniciar sesión</div>
            </div>
              <label htmlFor="username" className="block text-900 font-medium mb-2">Usuario</label>
              <InputText placeholder="Usuario" id="username" className="w-full mb-3" value={userValue} onChange={(e) => setUserValue(e.target.value)}/>
              <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
              <InputText type="password" className="w-full mb-3" value={passValue} feedback={false} onChange={(e) => setPassValue(e.target.value)}/>
              <Button label="Acceder" icon="pi pi-sign-in" className="w-full" onClick={fetchData} />
          </div>
      </div>
    </form>
  );
};
