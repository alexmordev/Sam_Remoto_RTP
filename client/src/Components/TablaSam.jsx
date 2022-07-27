import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {elementos} from '../Pruebas/CounterSamExample';
import { getSamCounters } from './../helpers/getSamCounters';



export const TablaSam = () => {

    const [products, setProducts] = useState([]);   //Aqui se almacenará el arreglo de la SAM


    //Solo una vez se carga el state de los datos de la sam, aqui sera la peticion de la API
    // para traer la información
    useEffect(() => {
      getData();
      // setProducts(elementos); 
    }, []); 

    const getData = async() => {
      const datos = await getSamCounters();
      setProducts(datos)
    }

  return (
    <div className="card">

        
            <DataTable value={products} paginator responsiveLayout="scroll" breakpoint="960px"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks 
                    NextPageLink LastPageLink RowsPerPageDropdown" 
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                    rows={10} rowsPerPageOptions={[8,10,12]}
                    className	="w-auto" >
                <Column field="id"      style={{with: '25%'}}   header="id"></Column>
                <Column field="sam"     style={{with: '25%'}}   header="SAM"></Column>
                <Column field="tarjeta" style={{with: '25%'}}   header="Tarjeta"></Column>
                <Column field="c00"     style={{with: '25%'}}   header="C00"></Column>
                <Column field="c01"     style={{with: '25%'}}   header="C01"></Column>
                <Column field="c02"     style={{with: '25%'}}   header="C02"></Column>
                <Column field="c03"      header="C03"></Column>
                <Column field="c04"      header="C04"></Column>
                <Column field="c05"      header="C05"></Column>
                <Column field="c06"      header="C06"></Column>
                <Column field="c07"      header="C07"></Column>
                <Column field="c08"      header="C08"></Column>
                <Column field="c09"      header="C09"></Column>
                <Column field="c10"      header="C10"></Column>
                <Column field="c11"      header="C11"></Column>
                <Column field="c12"      header="C12"></Column>
                <Column field="c13"      header="C13"></Column>
                <Column field="c14"      header="C14"></Column>
                <Column field="c15"      header="C15"></Column>
                <Column field="c16"      header="C16"></Column>
                <Column field="c17"      header="C17"></Column>
                <Column field="c18"      header="C18"></Column>
                <Column field="c19"      header="C19"></Column>
                <Column field="c20"      header="C20"></Column>
                <Column field="c21"      header="C21"></Column>
                <Column field="c22"      header="C22"></Column>
                <Column field="c23"      header="C23"></Column>
                <Column field="c24"      header="C24"></Column>
                <Column field="c25"      header="C25"></Column>
                <Column field="c26"      header="C26"></Column>
            </DataTable>

    </div>
  )
}
