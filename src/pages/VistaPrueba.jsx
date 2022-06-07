import { InputText } from 'primereact/inputtext'
import React from 'react'
import { Container } from '../Components/Container/Container'

export const VistaPrueba = () => {
  return (
    <Container>
        <div className='p-8 bg-green-200 w-6 h-26rem card  grid p-fluid flex  justify-content-between
         align-content-between flex-wrap border-round-3xl'>
            <div className="field col-12 md:col-3 ">
                <label htmlFor="antena">Antena</label>
                <InputText id="antena" keyfilter="antena" />
                
            </div>
            <div className="field col-12 md:col-3">
                <label htmlFor="folio">Folio</label>
                <InputText id="folio" keyfilter="num" />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="ns_card">NS Card</label>
                <InputText id="ns_card" keyfilter="ns_card" />
            </div>
            <div className="field col-12 md:col-3">
                <label htmlFor="credencial">Credencial</label>
                <InputText id="credencial" keyfilter="credencial"/>
            </div>
            <div className="field col-12 md:col-3">
            <label htmlFor="nom_trabajador">Trabajador Nombre</label>
                <InputText id="nom_trabajador" keyfilter="nom_trabajador" />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="pin_vigencia">PIN Vigencia / Meses </label>
                <InputText id="pin_vigencia" keyfilter={/^[^<>*!]+$/}/>
            </div>
          </div>

    </Container>
    )
}
