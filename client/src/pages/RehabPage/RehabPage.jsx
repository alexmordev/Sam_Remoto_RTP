import React, { useContext, useEffect, useState } from "react";

// Importaciones de componentes
import { Container } from "../../Components/Container/Container";

// Importaciones de comandos
import Rehabilitate from "../../calypsoComands/rehabilitateProcess/Rehabilitate";
import { readDeviceCard } from "./../../calypsoComands/readDeviceCard/readDeviceCard";


// Importaciones de helpers
import { VerifyDevice } from "../../helpers/VerifyDevice";
import { getWorker } from "../../helpers/getWorker";

//Importaciones de terceros
import {SpinnerDotted} from "spinners-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Swal from 'sweetalert2'
import { SocketContext } from "../../context/SocketContext";



export const RehabPage = () => {
    const [device, setDevice] = useState("");
    const [card, setCard] = useState("");
    const [credencial, setCredencial] = useState("");
    const [nomTrabajador, setnomTrabajador] = useState("");

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
            await setCard(wdates.trab_ser_tarjeta.slice(8));
          }
      };

    const cleanInputs = () => {
        setDevice('');
        setCard('');
        setCredencial('');
        setnomTrabajador('');
    }
    
    const rehabilitar = async () => {
        const rehabilitate = await Rehabilitate();
        Swal.fire({
          title: `Rehabilitando`,
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        cleanInputs();
      };


    return (
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
                    label="Leer"
                    className="p-button-raised border-round m-2"
                    onClick={readDates}
                    icon="pi pi-id-card"
                  />

                  <Button
                  label="Rehabilitar"
                  className="p-button-raised border-round m-2"
                  onClick={rehabilitar}
                  icon="pi pi-check"
                  />
                  
                </div>
                </Card>
            </div>
        </Container>
    );

}
