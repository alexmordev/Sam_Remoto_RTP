import React, { useContext, useEffect, useState } from "react";

// Importaciones de componentes
import { Container } from "../../Components/Container/Container";
import { SocketContext } from "../../context/SocketContext";

// Importaciones de comandos
import Rehabilitate from "../../calypsoComands/rehabilitateProcess/Rehabilitate";
import { readDeviceCard } from "./../../calypsoComands/readDeviceCard/readDeviceCard";

// Importaciones de helpers
import { VerifyDevice } from "../../helpers/VerifyDevice";
import { getWorker } from "../../helpers/getWorker";
import isLoading from "../../helpers/IsLoading";
import errHandler from "../../helpers/ErrHandler";

//Importaciones de terceros
import {SpinnerDotted} from "spinners-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Swal from "sweetalert2";



export const RehabPage = () => {
    const [online, setOnline] = useState(false)
    const [device, setDevice] = useState("");
    const [card, setCard] = useState("");
    const [credencial, setCredencial] = useState("");
    const [nomTrabajador, setnomTrabajador] = useState("");
    const { socket } = useContext( SocketContext );



  useEffect(() => {
    socket.on('status-device', ( data ) => {
      console.log(data.code);
      if (data.code === '0') {
        setOnline(false);
      } else if (data.code !== 0) {
        setOnline(true);
        actionCard(data.code);
      }
    })
    return () => socket.off('status-device');
  }, [socket])

  const actionCard = ( prop ) => {
    if (prop === '3') {
      readDates();
    } else if (prop === '2') {
      cleanInputs();
    }
  }

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
  );

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
        await setCard(wdates.trab_ser_tarjeta.slice(8));
        await setCredencial(wdates.trab_credencial);
        await setnomTrabajador(wdates.nombre);
      }
};

  const setRehab = async () => {
    Swal.fire({
      title: `Rehabilitando Tarjeta`,
      text: "Espere un momento por favor...",
      timerProgressBar: true,
      didOpen:()=>{
        Swal.showLoading()
        Rehabilitate()
        .then( success=> isLoading(success) )
        .catch( err=> errHandler( ) ) 
      }
    })

    cleanInputs();
  }

  const cleanInputs = () => {
    setDevice('');
    setCard('');
    setCredencial('');
    setnomTrabajador('');
  };

  const validarDatos = () => {
    if (card !== "" && 
        credencial !== "" && 
        nomTrabajador !== "" && 
        device !== "") {
        setRehab();
    } else{

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Proceso invalido',
        showConfirmButton: false,
        timer: 1800
      })

    }
  };

  const vista = (
    <Container>
          <div className="flex justify-content-center pb-6">
              <Card
                  title="REHABILITAR"
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
              </div>
              <div className="flex justify-content-center">
                  
                <Button
                label="Rehabilitar"
                className="p-button-raised border-round m-2"
                onClick={validarDatos}
                icon="pi pi-check"
                />
                
              </div>
              </Card>
          </div>
      </Container>
  );

    return (
      <>
        { online ? vista: interceptor }
      </>
    );
  
}