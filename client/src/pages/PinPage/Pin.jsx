// http://app.rtp.gob.mx/api/get_card/946ABD4C

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Container } from "../../Components/Container/Container";
import Rehabilitate from "../../calypsoComands/rehabilitateProcess/Rehabilitate";
import GetRequest from "../../calypsoComands/utils/GetRequest";
import changePinProcess from "../../calypsoComands/changePinProcess/changePinProcess";
import Swal from "sweetalert2";
import { readDeviceCard } from "./../../calypsoComands/readDeviceCard/readDeviceCard";
import { getWorker } from "../../helpers/getWorker";
import { Card } from "primereact/card";
import isLoading from "../../helpers/IsLoading";

export const Pin = () => {
  const [device, setDevice] = useState("");
  const [card, setCard] = useState("");
  const [credencial, setCredencial] = useState("");
  const [nomTrabajador, setnomTrabajador] = useState("");
  const [pinValue, setPinValue] = useState("");

  const setPin = async () => {
    // isLoading("Estableciendo PIN...");
    Rehabilitate();
  };
  const readDates = async () => {
    const data = await readDeviceCard();
    await setDevice(data.device.slice(0, -2));
    const snumber = data.serialNumber.slice(10);
    console.log(snumber);
    await setCard(snumber);
    const wdates = await getWorker(snumber);
    console.log(wdates);
    await setCredencial(wdates.trab_credencial);
    await setnomTrabajador(wdates.nombre);
    await setPinValue(wdates.trab_tarjeta_pin);
    await setCard(wdates.trab_ser_tarjeta.slice(8));
  };

  const validateData = () => {
    if (credencial === "") {
      console.log("Credencial vacio");
      // document.getElementById("aviso_credencial").innerText = " LLENAR CAMPO";
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar una Credencial ",
        //text: "Bienvenido Marios",
        icon: "error",
      });
    } else if (pinValue === "") {
      console.log("PIN vacio");
      // document.getElementById("aviso_pin").innerText = " LLENAR CAMPO ";
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar un Pin ",
        //text: "Bienvenido Mario",
        icon: "error",
      });
    } else {
      const Toast = Swal.mixin({
        // SPINNER
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Restableciendo PIN",
      });
      validarLongitud(); //SI TODOS ESTAN LLENOS SE MANDA LLAMAR ESTA FUNCION
    }
  };

  const validarLongitud = () => {
    if (credencial.length < 4) {
      // console.log('PIN invalido')
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar una credencial de 4 o 5 dígitos  ",
        //text: "Bienvenido Mario",
        icon: "error",
      });
    }
    if (pinValue.length < 4) {
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar un Pin de 4 dígitos  ",
        //text: "Bienvenido Mario",
        icon: "error",
      });
    }
  };



  return (
    <Container>
      <div className="flex justify-content-center pb-6">
        <Card
          title="CAMBIO DE PIN"
          className="flex justify-content-center col-12 md:col-12 lg:col-6 px-0 pb-0 pt-0"
        >
          <div class="grid p-fluid">
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
              onClick={readDates}
              icon="pi pi-id-card"
            />
            <Button
              label="Cambiar"
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