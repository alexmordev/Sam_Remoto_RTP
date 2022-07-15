import React, { useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
// import { BtnPin } from "../../Components/BtnPin";
import { Button } from "primereact/button";
import { Container } from "../../Components/Container/Container";
// import diversifier from './../../calypsoComands/diversifier';

export const Pin = () => {
  const [startFunction, setStartFunction] = useState("");
  
  
  const GetRequest = async(url)=>{
    const res = await fetch(url)
    if(!res)
      throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
  }
    
  const PostRequest = async(url,object)=>{
    const res = await fetch(url,{
      method:'POST',
      body:JSON.stringify(object),
      headers:{
        'Content-Type': 'application/json'
    }
    })
    if(!res)
      throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
  }

  const setPin = async() => {
    const applicationSN = await GetRequest('/selectApp');
    const diversifier = await PostRequest('http://dev-node.rtp.gob.mx:5000/diversifier',
                                          {"applicationSN": `${applicationSN.serialNumber}`});
    const challenge = await GetRequest('http://dev-node.rtp.gob.mx:5000/samChallenge');
    // const openSecure = await PostRequest('/openSecureSession', {"challenge":`${challenge.SamChallenge}` })

    // console.log(selectApp.serialNumber);
    return {applicationSN, diversifier, challenge}
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
              <InputText id="antena" placeholder="Antena" value={"ACS"} />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="folio">Folio</label>
              <InputText id="folio" placeholder="Folio" value={"FOLIOTEST/RTP/2022"}/>
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="ns_card">NS Card</label>
              <InputText id="ns_card" placeholder="NS Card" value={"card"} />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="credencial">Credencial</label>
              <InputText id="credencial" placeholder="Credencial" value={"9607"}/>
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="nombre">Nombre Trabajador</label>
              <InputText id="nombre" placeholder="Nombre trabajdor" value={"Alejandro Morales"} />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="vigencia">PIN </label>
              <InputText id="vigencia" placeholder="Ingresa un Pin de 4 digitos" value={"1010"} />
            </div>
          </div>
          {/* <BtnPin /> */}
          <div className=" w-2 flex justify-content-between">
            <Button
              label="Leer"
              onClick={setPin}
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
