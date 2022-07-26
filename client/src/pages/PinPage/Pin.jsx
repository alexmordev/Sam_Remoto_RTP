import React, { useState} from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Container } from "../../Components/Container/Container";
import Rehabilitate from "../../calypsoComands/rehabilitateProcess/Rehabilitate";
import GetRequest from "../../calypsoComands/utils/GetRequest";
import changePinProcess from "../../calypsoComands/changePinProcess/changePinProcess";
import Swal from 'sweetalert2';

export const Pin = () => {
  const [backendData, setBackendData] = useState([{}]);
  const [device, setDevice] = useState("");
  const [card, setCard] = useState();
  const [folio, setFolio] = useState('')
  const [credencial, setCredencial] = useState('');
  const [nomTrabajador, setnomTrabajador] = useState('');
  const [pinValue, setPinValue] = useState('')

  const validateDates = () => {
    
    if (folio === "") {
      console.log("Folio vacio");
      // document.getElementById("aviso_folio").innerText=" LLENAR CAMPO";
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar un folio ",
        //text: "Bienvenido Mario",
        icon: 'error',
      });

    } else if (credencial === "") {
      console.log("Credencial vacio");
      // document.getElementById("aviso_credencial").innerText = " LLENAR CAMPO";
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar una Credencial ",
        //text: "Bienvenido Marios",
        icon: 'error',
      });
      
    } else if (pinValue === "") {
      console.log("PIN vacio");
      // document.getElementById("aviso_pin").innerText = " LLENAR CAMPO ";
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar un Pin ",
        //text: "Bienvenido Mario",
        icon: 'error',
      });

    } else{

      const Toast = Swal.mixin({ // SPINNER
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Restableciendo PIN'
      })
      
      
      validarLongitud(); //SI TODOS ESTAN LLENOS SE MANDA LLAMAR ESTA FUNCION
    }
  }
  const validarLongitud = () =>{
        
    if (credencial.length < 4 ){
      // console.log('PIN invalido')

      Swal.fire({
        title: "Error",
        text: "Es necesario colocar una credencial de 4 o 5 dígitos  ",
        //text: "Bienvenido Mario",
        icon: 'error',
      });
      
    }
    
    if (pinValue.length < 4 ){
      Swal.fire({
        title: "Error",
        text: "Es necesario colocar un Pin de 4 dígitos  ",
        //text: "Bienvenido Mario",
        icon: 'error',
      });
    }
    
    
  }
  const GetRequest = async (url) => {
    const res = await fetch(url);
    if (!res) throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
  };
  const PostRequest = async (url, object) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res) throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
  };
  const setNewPin = async () => {
    const start = Date.now();
    // const currentDF = await GetRequest("/selectCurrentDF");
    // const getRehabilitate = await Rehabilitate();

    console.log('***Convirtiendo en ASCII***');
    const newPin  = pinValue;
    const value_0 = newPin.charCodeAt(0);
    const value_1 = newPin.charCodeAt(1);
    const value_2 = newPin.charCodeAt(2);
    const value_3 = newPin.charCodeAt(3);
    const ascii_pin = `${value_0}${value_1}${value_2}${value_3}`
    console.log('New Pin Decimal: ', newPin);
    console.log('New Pin ASCII: ', ascii_pin);

    const applicationSN = await GetRequest("/selectApp");
    console.log("Select Aplication: ", applicationSN.serialNumber);
    const { SelectDiversifier } = await PostRequest(
      "http://dev-node.rtp.gob.mx:5000/diversifier",
      {
        "applicationSN": `${applicationSN.serialNumber}`,
      }
    );
    console.log("Diversifier: ", SelectDiversifier.Status);

    const getChal = await GetRequest("/getChallenge");
    console.log("Get challenge: ", getChal.GetChallenge.Status);

    const { GiveRandom } = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/random`,
      { "challenge": `${getChal.GetChallenge.Response.slice(0, -4)}` }
    );
    console.log("Give Random: ", GiveRandom.Status);

    const cardCipher = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/cipherUpdate`,
      { "pin": `${ascii_pin}` }
    );
    console.log("CardCipher: ", cardCipher.response.Status);

    const { changePinResponse } = await PostRequest(`/changePin`, {
      "newPin": `${cardCipher.response.Response.slice(0, -4)}`,
    });
    console.log("Change Pin: ", changePinResponse.Status);

    console.log('********Verificar Pin *********');

    const getChal2 = await GetRequest("/getChallenge");
    console.log("Get challenge2: ", getChal2.GetChallenge.Status);

    const data = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/random`,
      { "challenge": `${getChal2.GetChallenge.Response.slice(0, -4)}` }
    );
    console.log("Give Random2: ", data.GiveRandom.Status);


    const cipherVerify = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/cipherVerify`,
      {"pin": `${ascii_pin}`}
    );
    console.log('cipherVerify: ', cipherVerify.response.Status );

    let timer = Date.now() - start;
    console.log(timer);
  };
  const verifyIndex = async() => {
    await changePinProcess( pinValue )
  }
  const setPin = async () => {
    const currentDF = await GetRequest('/selectCurrentDF');
    if(currentDF.applicationStatus !== "00"){
      /**
       * Indicar que se corre comando de rehabilitacion;
       */
      await Rehabilitate();
    }
    /**
     * Indicar que se corre PIN
     */
    await setNewPin();
  };

  return (
    <Container>
      <div className=" h-screen w-full flex flex-column justify-content-center">
        <div className=" mt-5  w-full h-1rem flex justify-content-center align-items-center">
          <p className="text-white-alpha-90 font-bold text-3xl">
            CAMBIO DE PIN
          </p>
        </div>

        <div className=" mt-8 flex flex-column justify-content-center align-items-center">
          <div
            className="p-4 bg-green-400 w-8  h-auto card  grid  p-fluid  flex flex-wrap  justify-content-between
            align-content-between flex-wrap border-round-3xl"
          >
            <div className="field col-12 md:col-4">
              <label htmlFor="antena">Antena</label>
              <InputText id="antena" placeholder="Antena" value={"ACS"} readOnly={true}/>
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="folio">Folio</label>
              <InputText
                id="folio"
                placeholder="Folio"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="ns_card">NS Card</label>
              <InputText id="ns_card" placeholder="NS Card" value={"card"} readOnly={true}/>
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="credencial">Credencial</label>
              <InputText
                id="credencial"
                placeholder="Credencial"
                value={credencial}
                onChange={ (e) => setCredencial(e.target.value) }
                maxLength={5}
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="nombre">Nombre Trabajador</label>
              <InputText
                id="nombre"
                placeholder="Nombre trabajdor"
                value={nomTrabajador}
                onChange={ (e) => setnomTrabajador( e.target.value ) }
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="vigencia">PIN </label>
              <InputText
                id="vigencia"
                value={pinValue}
                placeholder="Ingresa un Pin de 4 digitos"
                // onValueChange={ (e) => setPinValue( e.target.value )}
                onChange={ (e) => setPinValue( e.target.value )}
                maxLength= {4}
                // mode="decimal"
                required={true}
              />
            </div>
          </div>
          
          <div className=" w-5 flex justify-content-around">
            <Button
              label="Leer"
              className="mt-4 w-5 p-button-sm p-button-success flex justify-content-around"
            />

            <Button
              label="Cambiar"
              className="mt-4 w-5 p-button-sm p-button-success flex justify-content-around"
              onClick={setPin}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
