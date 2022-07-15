import React, { useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
// import { BtnPin } from "../../Components/BtnPin";
import { Button } from "primereact/button";
import { Container } from "../../Components/Container/Container";
import index from './../../calypsoComands/changePinProcess/index';

export const Pin = () => {

  const [backendData, setBackendData] = useState([{}]);
  const [device, setDevice] = useState('');
  const [card, setCard] = useState();
  
  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data);
  //     }
  //   );
  // },[]);

  index()
  

  const showDates = () => {
    const { devices, card } = backendData;
    setDevice(devices);
    setCard( card.slice(18));
    // setDevice(backendData.devices);
    // setCard(backendData.card)
  };

  return (
    <Container>
      <div className=" h-screen w-full">
        <div className=" mt-6  w-full h-4rem flex justify-content-center align-items-center">
          <p className="text-white-alpha-90 font-bold text-3xl">
            CAMBIO DE PIN
          </p>
        </div>

        <div className=" mt-6 flex flex-column justify-content-center align-items-center">
          <div
            className="p-8 bg-green-400 w-6 h-26rem card  grid  p-fluid  flex  justify-content-between
            align-content-between flex-wrap border-round-3xl"
          >
            <div className="field col-12 md:col-3">
              <label htmlFor="antena">Antena</label>
              <InputText id="antena" placeholder="Antena" value={device} />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="folio">Folio</label>
              <InputText id="folio" placeholder="Folio" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="ns_card">NS Card</label>
              <InputText id="ns_card" placeholder="NS Card" value={card} />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="credencial">Credencial</label>
              <InputText id="credencial" placeholder="Credencial" />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="nombre">Nombre Trabajador</label>
              <InputText id="nombre" placeholder="Nombre trabajdor" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="vigencia">PIN Vigencia</label>
              <InputText id="vigencia" placeholder="Ingresar en meses" />
            </div>
          </div>
          {/* <BtnPin /> */}
          <div className=" w-2 flex justify-content-between">
            <Button
              label="Leer"
              onClick={showDates}
              className="mt-4 w-5 p-button-lg p-button-success"
            />
            <Button
              label="Cambiar"
              className="mt-4 w-5 p-button-lg p-button-success"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
