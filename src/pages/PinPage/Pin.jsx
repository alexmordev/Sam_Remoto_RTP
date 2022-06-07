import React from "react";
import { Header } from "../../Components/Header/Header";
import { InputText } from "primereact/inputtext";
import { BtnPin } from "../../Components/BtnPin";
import { Container } from "../../Components/Container/Container";

export const Pin = () => {
  return (
    //     <div className='w-full h-full'>
    //       <Header />
    //       <br />
    //       <div className='flex flex-column justify-content-center align-content-center'>

    //         <div className=" w-full h-4rem bg-green-400 flex justify-content-center align-content-center
    //                 flex-wrap card-container">
    //           <p className="text-3xl font-bold text-white  flex align-content-center
    //                           justify-content-center">
    //               Cambio de PIN
    //           </p>
    //         </div>
    //         <br /><br />
    //         <div className="flex justify-content-center align-content-center ">

    //           <div className='p-8 bg-green-200 w-6 h-26rem card  grid  p-fluid  flex  justify-content-between
    //          align-content-between flex-wrap border-round-3xl'>
    //             <div className="field col-12 md:col-3 ">
    //                 <label htmlFor="antena">Antena</label>
    //                 <InputText id ="antena" keyfilter="antena" />
    //             </div>
    //             <div className="field col-12 md:col-3">
    //                 <label htmlFor="folio">Folio</label>
    //                 <InputText id ="folio" keyfilter="num" />
    //             </div>
    //             <div className="field col-12 md:col-4">
    //                 <label htmlFor="ns_card">NS Card</label>
    //                 <InputText id ="ns_card" keyfilter="ns_card" />
    //             </div>
    //             <div className="field col-12 md:col-3">
    //                 <label htmlFor="credencial">Credencial</label>
    //                 <InputText id ="credencial" keyfilter="credencial"/>
    //             </div>
    //             <div className="field col-12 md:col-3">
    //             <label htmlFor="nom_trabajador">Trabajador Nombre</label>
    //                 <InputText id ="nom_trabajador" keyfilter="nom_trabajador" />
    //             </div>
    //             <div className="field col-12 md:col-4">
    //                 <label htmlFor="pin_vigencia">PIN Vigencia / Meses </label>
    //                 <InputText id ="pin_vigencia" keyfilter={/^[^<>*!]+$/}/>
    //             </div>
    //           </div>
    //         </div>

    //     </div>
    //     <div className='h-4rem'></div>

    //     <div className='flex justify-content-center '>
    //       <BtnPin />
    //     </div>

    //     </div>
    //   );
    // };


<Container>
      <div className=" h-screen w-screen flex justify-content-center align-items-center ">
        <div className='bg-red-300 h-full flex flex-column justify-content-center align-items-center'>
          <div
            className="p-8 bg-green-200 w-6 h-26rem card  grid  p-fluid  flex  justify-content-between
            align-content-between flex-wrap border-round-3xl"
          >
            <div className="field col-12 md:col-3">
              <label htmlFor="antena">Antena</label>
              <InputText id="antena" placeholder="Antena" />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="folio">Folio</label>
              <InputText id="folio" placeholder="Folio" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="ns_card">NS Card</label>
              <InputText id="ns_card" placeholder="NS Card" />
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
          <BtnPin />
        </div>
      </div>
    </Container>
  );
};
