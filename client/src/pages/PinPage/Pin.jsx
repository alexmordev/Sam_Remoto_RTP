// http://app.rtp.gob.mx/api/get_card/946ABD4C

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Container } from "../../Components/Container/Container";
import Rehabilitate from "../../calypsoComands/rehabilitateProcess/Rehabilitate";
// import GetRequest from "../../calypsoComands/utils/GetRequest";
// import changePinProcess from "../../calypsoComands/changePinProcess/changePinProcess";
import Swal from "sweetalert2";
import { readDeviceCard } from "./../../calypsoComands/readDeviceCard/readDeviceCard";

// Importaciones de helpers
import { VerifyDevice } from "../../helpers/VerifyDevice";
import { getWorker } from "../../helpers/getWorker";

//Importaciones de terceros
import { SpinnerDotted } from "spinners-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { Card } from "primereact/card";
import isLoading from "../../helpers/IsLoading";

// import isLoading from "../../helpers/IsLoading";

export const Pin = () => {  
  const [device, setDevice] = useState("");
  const [card, setCard] = useState("");
  const [credencial, setCredencial] = useState("");
  const [nomTrabajador, setnomTrabajador] = useState("");
  const [pinValue, setPinValue] = useState("");

  const { socket } = useContext( SocketContext );

  useEffect(() => {
    socket.on('status-device', (device) =>{
      console.log(device);
      switch (device.code) {
        case '2':
          cleanInputs();
          break;
          case '3':
            readDates();
            break;
        default:
          break;
      }
    });
    return () => socket.off('status-device');
  }, [socket])

  const readDates = async () => {
      
      const data = await readDeviceCard();
      const snumber = data.serialNumber.slice(10);
      const wdates = await getWorker(snumber);

      if (wdates === '0') {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tarjeta Invalida',
          showConfirmButton: false,
          timer: 1800
        })
        
      } else if (wdates.error) {
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
    cleanInputs();
  };

  // useEffect(() => {
  //   socket.on('status-device', (device) =>{
  //     console.log(device);
  //     switch (device.code) {
  //       case '2':
  //         cleanInputs();
  //         break;
  //         case '3':
  //           readDates();
  //           break;
  //       default:
  //         break;
  //     }
  //   });
  // }, [socket])


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
                  label="Leer"
                  className="p-button-raised border-round m-2"
                  onClick={readDates}
                  icon="pi pi-id-card"
                />

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

  );
};