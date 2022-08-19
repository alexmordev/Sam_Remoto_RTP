import React, { useEffect, useState } from "react";

// Importaciones de componentes
import { Container } from "../../Components/Container/Container";

// Importaciones de comandos
import changePinProcess from "../../calypsoComands/changePinProcess/changePinProcess";
import { readDeviceCard } from "./../../calypsoComands/readDeviceCard/readDeviceCard";

// Importaciones de helpers
import { VerifyDevice } from "../../helpers/VerifyDevice";
import { getWorker } from "../../helpers/getWorker";

// Importaciones de sockets
import io from 'socket.io-client';

//Importaciones de terceros
import { SpinnerDotted } from "spinners-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { Card } from "primereact/card";
import Swal from 'sweetalert2'

// Status para el estado de la antena :
// 0: Antena desconectada
// 1: Antena conectad

const connectSocket = () =>{
  // const socket = io('http://localhost:5000')
  const socket = io('http://localhost:5000', { transports: ["websocket"] })
  return socket;
}

export const Pin2 = () => {  
  const [devConected, setDevConected] = useState(false);
  const [device, setDevice] = useState("");
  const [card, setCard] = useState("");
  const [credencial, setCredencial] = useState("");
  const [nomTrabajador, setnomTrabajador] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [timer, setTimer]   = useState(false);
  const [ socket ] = useState( connectSocket() );
  const [code, setCode] = useState(0)

  const readDates = async () => {
    const data = await readDeviceCard();
    const snumber = data.serialNumber.slice(10);
    const wdates = await getWorker(snumber);

    if (wdates.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tarjeta no registrada',
        showConfirmButton: false,
        timer: 1800
      })
    } else {
      await setDevice(data.device.slice(0, -2));
      await setCard(snumber);
      await setCredencial(wdates.trab_credencial);
      await setnomTrabajador(wdates.nombre);
      await setPinValue(wdates.trab_tarjeta_pin);
      await setCard(wdates.trab_ser_tarjeta.slice(8));
    }
  };

  const cleanInputs = () => {
    setDevice('');
    setCard('');
    setCredencial('');
    setnomTrabajador('');
    setPinValue('');
  }

  const setPin = async () => {
    const getchangePinProcess = await changePinProcess(pinValue);
    Swal.fire({
      title: `Cambiando Pin`,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const vista = (
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
                    readOnly={true}
                  />
                </div>
                <div className="field col-12 md:col-8 py-0">
                  <label htmlFor="nombre">Trabajador</label>
                  <InputText
                    id="nombre"
                    placeholder="Nombre trabajador"
                    value={nomTrabajador}
                    onChange={(e) => setnomTrabajador(e.target.value)}
                    readOnly={true}
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
                    readOnly={true}
                    // mode="decimal"
                    required={true}
                  />
                </div>
              </div>
              <div className="flex justify-content-center">
                
                <Button
                  label="Cambiar Pin"
                  className="p-button-raised border-round m-2"
                  onClick={setPin}
                  icon="pi pi-check"
                />
              </div>
            </Card>
          </div>
          
        </Container>
  )

    const interceptor = (
      <Container>
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
        </Container>
      )
      
      useEffect(() => {
        socket.on('status-device', (device) =>{
          switch (device.code) {
            case '0':
              setCode(0);
              setDevConected(false);
              break;
              case '1':
              setCode(1);
              setDevConected(true);
              break;
              case '2':
              setCode(2);
              setDevConected(true);
              cleanInputs();
              break;
              case '3':
                setCode(3);
                setDevConected(true);
                readDates();
              break;
            default:
              break;
          }

          // if (device.code === '0') {
          //   setDevConected(false);
          // } else if (device.code === '1'){
          //   setDevConected(true);
          // } else if (device.code === '3') {
          //   readDates();
          //   setDevConected(true);
          // } else if (device.code === '2'){
          //   setDevConected(true);
          //   cleanInputs();
          // } else{
          //   setDevConected(true);
          // }
        });
      
    }, [socket])


    useEffect(() => {
      async function validando () {
        const resp = await VerifyDevice();

        if (resp === 1) {
            setTimer(true);
            setDevConected(true);
        } 
      }
      validando();
    }, []);

    if (timer === false) {
        return interceptor
    }

    const validarVista = () => {
      if (devConected === false){
        return interceptor
      } else if (devConected === true) {
        return vista
      }
    };

    return (
      <>
        { validarVista() }
      </>
    );

    
}; 