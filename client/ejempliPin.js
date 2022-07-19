
import React, { useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
// import { BtnPin } from "../../Components/BtnPin";
import { Button } from "primereact/button";
import { Container } from "../../Components/Container/Container";
import changePinProcess from "../../calypsoComands/changePinProcess/changePinProcess";
// import { Rehabilitate } from "../../../../server/controllers/Temp/Rehabilitate";

export const Pin = () => { 
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

  const rehabilitate = async() => {
    const start = Date.now();
    const applicationSN = await GetRequest('/selectApp');
    const diversifier = await PostRequest('http://dev-node.rtp.gob.mx:5000/diversifier',
                                        {
                                          "applicationSN": `${applicationSN.serialNumber}`
                                        });
    const challenge = await GetRequest('http://dev-node.rtp.gob.mx:5000/samChallenge');
    const cleanChallenge = challenge.SamChallenge.Response.slice(0,-4);
    const oppenSecure = await PostRequest('/oppenSecureSession', 
                                        {
                                          "challenge":`${cleanChallenge}` 
                                        });
    const cleanOppenSecure = oppenSecure.OpenSecureSession.Response.slice(0,-4);                                  
    const digestInit = await PostRequest('http://dev-node.rtp.gob.mx:5000/digestInit',
                                        {
                                          "secureSession":`${cleanOppenSecure}`
                                        });
    const rehabilitate = await GetRequest('/rehabilitate');
    // const cleanRehabilitate = rehabilitate.
    const digestUpdate1 =  await PostRequest('http://dev-node.rtp.gob.mx:5000/digestUpdate',
                                        {
                                          "digestData":`0044000000`
                                        });
    const digestUpdate2 =  await PostRequest('http://dev-node.rtp.gob.mx:5000/digestUpdate',
                                        {
                                          "digestData":`${digestUpdate1.DigestUpdate.Response.slice(-4)}`
                                        });
    const digestClose = await GetRequest('http://dev-node.rtp.gob.mx:5000/digestClose');
    const cleanCloseDigest = digestClose.DigestClose.Response.slice(0,-4);
    const closeSecure = await PostRequest('/closeSecureSession', 
                                        {
                                          "digestClose":`${cleanCloseDigest}`
                                        });
    const authenticate = await PostRequest('http://dev-node.rtp.gob.mx:5000/digestAuthenticate', 
                                        {
                                          "signature":`${closeSecure.CloseSecureSession.Response.slice(0,-4)}`
                                        });
                                                                            
    const ratificaton = await GetRequest( '/ratification' )                                  

    const timer = Date.now() - start;

    const objectResponse = {applicationSN, 
                          diversifier, 
                          challenge, 
                          oppenSecure, 
                          digestInit, 
                          rehabilitate,
                          digestUpdate1, 
                          digestUpdate2,
                          digestClose,
                          closeSecure, 
                          authenticate,
                          ratificaton,
                          timer};
    // console.log(objectResponse);
    return objectResponse;
  }
  const selectApp = async() => {
    const applicationSN = await GetRequest('/selectApp');
    return applicationSN;
  }
  
  // const setPin = async()=>{
  //   const start = Date.now();
  //   const currentDF = await GetRequest('/selectCurrentDF');
  //   if( currentDF.applicationStatus == "00" ){
  //     let getRehabilitate = await rehabilitate();
  //     if( getRehabilitate.rehabilitate.rehabilitate.Response == "9000" ){
  //       let getchangePinProcess= await changePinProcess()
  //       let timer = Date.now() - start;
        // let getchangePinProcess = "changePin"

        // console.log(getRehabilitate, getchangePinProcess, timer);
      // }
    // }
    // let getchangePinProcess= await changePinProcess()
    // let getchangePinProcess = "changePin"
    // let timer = Date.now() - start; 
    // console.log( timer, getchangePinProcess);
  // }

  const setPin = async()=>{
    const currentDF = await GetRequest('/selectCurrentDF');
    const getRehabilitate = await rehabilitate();
    // const getchangePinProcess = await changePinProcess();
    const selectA = await selectApp();
    console.log(currentDF, getRehabilitate, selectA);

  }


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
              className="mt-4 w-5 p-button-lg p-button-success"
            />
            <Button
              label="Cambiar"
              className="mt-4 w-5 p-button-lg p-button-success"
              onClick={setPin}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};