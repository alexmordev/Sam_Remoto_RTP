import React, { useState} from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Container } from "../../Components/Container/Container";
import Rehabilitate from "../../calypsoComands/rehabilitateProcess/Rehabilitate";
// import GetRequest from "../../calypsoComands/utils/GetRequest";
// import { InputNumber } from 'primereact/inputnumber';
import changePinProcess from "../../calypsoComands/changePinProcess/changePinProcess";
import Swal from 'sweetalert2';
import { readDeviceCard } from './../../calypsoComands/readDeviceCard/readDeviceCard';


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
  
  const setPin = async () => {
    // const currentDF = await GetRequest("/selectCurrentDF");
    const rehabilitate = await Rehabilitate();
    const getchangePinProcess = await changePinProcess(pinValue);

  };

  const readDates = async () => {

    const data = await readDeviceCard();
    await setDevice(data.device.slice(0,-2));
    await setCard(data.serialNumber.slice(10));
  }

  return (
    <Container>
      <div className=" pb-5 h-screen w-full flex flex-column justify-content-center">
        <div className=" mt-5  w-full h-1rem flex justify-content-center align-items-center">
          <p className="text-white-alpha-90 font-bold text-3xl">
            CAMBIO DE PIN
          </p>
        </div>

        <div className=" mt-8 mb-8 flex flex-column justify-content-center align-items-center">
          <div
            className="p-4 bg-green-400 w-8  h-auto card  grid  p-fluid  flex flex-wrap  justify-content-between
            align-content-between flex-wrap border-round-3xl"
          >
            <div className="field col-12 md:col-4">
              <label htmlFor="antena">Antena</label>
              <InputText id="antena" placeholder="Antena" value={device} readOnly={true}/>
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
              <InputText id="ns_card" placeholder="NS Card" value={card} readOnly={true}/>
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
          
          <div className="mt-0 mb-6 w-5 flex justify-content-around">
            <Button
              label="Leer"
              className="mt-1 w-5 p-button-sm p-button-success flex justify-content-around"
              onClick={readDates}
            />

            <Button
              label="Cambiar"
              className="mt-1 w-5 p-button-sm p-button-success flex justify-content-around"
              onClick={setPin}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
