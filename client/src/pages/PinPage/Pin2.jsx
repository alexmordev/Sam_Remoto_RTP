//Importaciones de terceros
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {SpinnerDotted} from "spinners-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Swal from "sweetalert2";
// Importaciones de componentes
import { Container } from "../../Components/Container/Container";
// Importaciones de comandos
import ChangePinSequence from "../../calypsoComands/changePinProcess/changePinProcess";
import { readDeviceCard } from "./../../calypsoComands/readDeviceCard/readDeviceCard";
// Importaciones de helpers
import { VerifyDevice } from "../../helpers/VerifyDevice";
import { getWorker } from "../../helpers/getWorker";
import isLoading from "../../helpers/IsLoading";
import errHandler from "../../helpers/ErrHandler";
import GetRequest from "../../calypsoComands/utils/GetRequest";

export const Pin2 = () => {  
  const [device, setDevice] = useState("");
  const [card, setCard] = useState("");
  const [credencial, setCredencial] = useState("");
  const [nomTrabajador, setnomTrabajador] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [timer, setTimer]   = useState(false);
  const navigate = useNavigate();
  const interceptor = (

    <div className="h-screen w-screen  flex align-items-center justify-content-center">
      <div className="flex flex-column">
        <SpinnerDotted 
          size={300} 
          thickness={80} 
          color={"#38ad48"} 
          speed={60}
          />
      <p className="text-green-500 text-3xl font-semibold pt-6 pl-4" >Detectando Antena</p>
        </div>
    </div>
  )

  const setPin = () => {
    Swal.fire({
      title: `Estableciendo Pin`,
      text: "Espere un momento por favor...",
      timerProgressBar: true,
      didOpen:()=>{
        Swal.showLoading()
        ChangePinSequence(pinValue)
          .then( success=> isLoading(success) )
          .catch( err=> errHandler(err)) 
      }
    })
    cleanInputs();
  };
  const validateData = (  ) => {
    if (credencial === "") {
      console.log("Credencial vacio");
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar una Credencial ",
        icon: "error",
      });
    } else if (pinValue === "") {
      console.log("PIN vacio");
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar un Pin ",
        icon: "error",
      });
    } else if (credencial.length < 4) {
        // console.log('PIN invalido')
        Swal.fire({
          title: "Error",
          text: "Es necesario colocar una credencial de 4 o 5 dígitos  ",
          //text: "Bienvenido Mario",
          icon: "error",
        });
    } else if (pinValue.length < 4) {
        Swal.fire({
          title: "Error",
          text: "Es necesario colocar un Pin de 4 dígitos  ",
          //text: "Bienvenido Mario",
          icon: "error",
        });
    }else{
      setPin();
    }
  }
    
  const cleanInputs = () => {
    setDevice('');
    setCard('');
    setCredencial('');
    setnomTrabajador('');
    setPinValue('');
  }

  const readData = async () => {
    const currentDF = await GetRequest("/selectCurrentDF");
    // console.log(currentDF);
    if( currentDF.status === "Correct Execution" ){
      try {
        const data = await readDeviceCard();
        await setDevice(data.device.slice(0, -2));
        const snumber = data.serialNumber.slice(10);
        await setCard(snumber);
        const wdates = await getWorker(snumber);
        await setCredencial(wdates.trab_credencial);
        await setnomTrabajador(wdates.nombre);
        await setPinValue(wdates.trab_tarjeta_pin);
        await setCard(wdates.trab_ser_tarjeta.slice(8));
      }
      catch(err){
        throw err;
      }
    }else{
      Swal.fire({
        title: "Es necesario Rehabilitar",
        text: "Tu aplicación de Transporte está bloqueada",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ir a Rehabilitar!'
      }).then((result) => {
        if (result.isConfirmed) {  
          navigate('/rehabilitate');
        }
      })
    }

  };

  useEffect(() => {
    async function validando () {
      const resp = await VerifyDevice();

      if (resp === 1) {
          setTimer(true);
      } 
    }
    validando();
  }, []);

  if (timer === false) {
      return interceptor
  }

  return (
      <Container>
    <div className="flex justify-content-center pb-6">
      <Card
        title="CAMBIO DE PIN"
        className="flex justify-content-center col-12 md:col-12 lg:col-6 px-0 pb-0 pt-0"
      >
        <div className="grid p-fluid">
          <div className="field col-12 md:col-4 py-0">
            <label htmlFor="antena">Antena</label>
            <InputText
              id="antena"
              placeholder="Antena"
              value={device}
              readOnly={true}
            />
          </div>
          <div className="field col-12 md:col-4 py-0">
            <label htmlFor="ns_card">NS Card</label>
            <InputText
              id="ns_card"
              placeholder="NS Card"
              value={card}
              readOnly={true}
            />
          </div>
          <div className="field col-12 md:col-4 py-0">
            <label htmlFor="credencial">Credencial</label>
            <InputText
              id="credencial"
              placeholder="Credencial"
              value={credencial}
              onChange={(e) => setCredencial(e.target.value)}
              maxLength={5}
            />
          </div>
          <div className="field col-12 md:col-8 py-0">
            <label htmlFor="nombre">Trabajador</label>
            <InputText
              id="nombre"
              placeholder="Nombre trabajador"
              value={nomTrabajador}
              onChange={(e) => setnomTrabajador(e.target.value)}
            />
          </div>
          <div className="field col-12 md:col-4 py-0">
            <label htmlFor="vigencia">PIN</label>
            <InputText
              id="vigencia"
              value={pinValue}
              placeholder="Ingresa un Pin de 4 digitos"
              // onValueChange={ (e) => setPinValue( e.target.value )}
              onChange={(e) => setPinValue(e.target.value)}
              maxLength={4}
              // mode="decimal"
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-content-center">
          <Button
            label="Leer"
            className="p-button-raised border-round m-2"
            onClick={readData}
            icon="pi pi-id-card"
          />
          <Button
            label="Cambiar Pin"
            className="p-button-raised border-round m-2"
            onClick={validateData}
            icon="pi pi-check"
          />
        </div>
      </Card>
    </div>
  </Container>
  ); 
}; 