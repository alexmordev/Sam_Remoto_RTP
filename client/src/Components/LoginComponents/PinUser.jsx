import React from 'react'
import { InputText } from 'primereact/inputtext';




export const PinUser = () => {
    // console.log('Estoy en PIN :)');
    return (

      
      <div className='surface-300  flex justify-content-center' >

      <div className='p-8'>
            <div className="card" >
                <div className="grid p-fluid">
                    <div className="field col-12 md:col-3 ">
                        <label htmlFor="integer">Antena</label>
                        <InputText id="integer" keyfilter="int" />
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="numbers">Folio</label>
                        <InputText id="numbers" keyfilter="num" />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="money">NS Card</label>
                        <InputText id="money" keyfilter="money" />
                    </div>
                    {/* <div className="field col-12 md:col-3">
                    <label htmlFor="hex">Hex</label>
                        <InputText id="hex" keyfilter="hex" />
                    </div> */}
                    <div className="field col-12 md:col-3">
                        <label htmlFor="alpha">Credencial</label>
                        <InputText id="alpha" keyfilter="alpha"/>
                    </div>
                    <div className="field col-12 md:col-3">
                    <label htmlFor="alphanum">Trabajador Nombre</label>
                        <InputText id="alphanum" keyfilter="alphanum" />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="block">PIN Vigencia / Meses </label>
                        <InputText id="block" keyfilter={/^[^<>*!]+$/}/>
                    </div>
                    {/* <div className="field col-12 md:col-3">
                        <label htmlFor="spaceblock">Block space key</label>
                        <InputText id="spaceblock" keyfilter={/[^\s]/} />
                    </div> */}
                </div>
            </div>
        </div>
                    


      </div>
      // <h1>Hola :)</h1>
      
  )
  
}

<footer>Derechos Reservados RTP Versión 1.0</footer>