import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getSamCounters } from './../../helpers/getSamCounters';
import { Button } from "primereact/button";
import { Tooltip } from 'primereact/tooltip';



export const TablaSam = () => {

    const [products, setProducts] = useState([]);   //Aqui se almacenará el arreglo de la SAMs

    useEffect(() => {
      getData(); 
    }, []); 
    
    const getData = async() => {
      const {categories} = await getSamCounters();
      for (let index = 0; index < categories.length; index++) {
        let fecha = categories[index].createdAt.substring(0,10)
        let hora = categories[index].createdAt.substring(11,19)
        let fechaHora = `${fecha} ${hora}`
        let element = {
          "id":         categories[index].id, 
          "sam":        categories[index].sam, 
          "tarjeta":    categories[index].tarjeta, 
          "c00":        categories[index].c00,
          "c01":        categories[index].c01,
          "c02":        categories[index].c02,
          "c03":        categories[index].c03,
          "c04":        categories[index].c04,
          "c05":        categories[index].c05,
          "c06":        categories[index].c06,
          "c07":        categories[index].c07,
          "c08":        categories[index].c08,
          "c09":        categories[index].c09,
          "c10":        categories[index].c10,
          "c11":        categories[index].c11,
          "c12":        categories[index].c12,
          "c13":        categories[index].c13,
          "c14":        categories[index].c14,
          "c15":        categories[index].c15,
          "c16":        categories[index].c16,
          "c17":        categories[index].c17,
          "c18":        categories[index].c18,
          "c19":        categories[index].c19,
          "c20":        categories[index].c20,
          "c21":        categories[index].c21,
          "c22":        categories[index].c22,
          "c23":        categories[index].c23,
          "c24":        categories[index].c24,
          "c25":        categories[index].c25,
          "c26":        categories[index].c26,
          "Fecha_creacion":  fechaHora, 
        }
        setProducts( pro => [ ...pro, element ] );
      };
    };


    const exportExcel = () => {
      import('xlsx').then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(products);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          saveAsExcelFile(excelBuffer, 'products');
      });
    }
    
    const saveAsExcelFile = (buffer, fileName) => {
      import('file-saver').then(module => {
          if (module && module.default) {
              let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
              let EXCEL_EXTENSION = '.xlsx';
              const data = new Blob([buffer], {
                  type: EXCEL_TYPE
              });
    
              module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
          }
      });
    }


  return (
    <div className="card">
      <div className="flex flex-row-reverse pb-2">
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          className="p-button-success mr-2 "
          data-pr-tooltip="XLS"
        />  
        </div>
          <DataTable dataKey="id_table" value={products} paginator responsiveLayout="scroll" breakpoint="960px"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks 
                  NextPageLink LastPageLink RowsPerPageDropdown" 
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                  rows={10} rowsPerPageOptions={[8,10,12]}
                  className	="w-auto" size="large"> 
              <Column field="id"              header="id"></Column>
              <Column field="sam"             header="SAM"></Column>
              <Column field="tarjeta"         header="Tarjeta"></Column>
              <Column field="c00"             header="C00"></Column>
              <Column field="c01"             header="C01"></Column>
              <Column field="c02"             header="C02"></Column>
              <Column field="c03"             header="C03"></Column>
              <Column field="c04"             header="C04"></Column>
              <Column field="c05"             header="C05"></Column>
              <Column field="c06"             header="C06"></Column>
              <Column field="c07"             header="C07"></Column>
              <Column field="c08"             header="C08"></Column>
              <Column field="c09"             header="C09"></Column>
              <Column field="c10"             header="C10"></Column>
              <Column field="c11"             header="C11"></Column>
              <Column field="c12"             header="C12"></Column>
              <Column field="c13"             header="C13"></Column>
              <Column field="c14"             header="C14"></Column>
              <Column field="c15"             header="C15"></Column>
              <Column field="c16"             header="C16"></Column>
              <Column field="c17"             header="C17"></Column>
              <Column field="c18"             header="C18"></Column>
              <Column field="c19"             header="C19"></Column>
              <Column field="c20"             header="C20"></Column>
              <Column field="c21"             header="C21"></Column>
              <Column field="c22"             header="C22"></Column>
              <Column field="c23"             header="C23"></Column>
              <Column field="c24"             header="C24"></Column>
              <Column field="c25"             header="C25"></Column>
              <Column field="c26"             header="C26"></Column>
              {/* <Column field="secuencia "      header="Secuencia"></Column> */}
              {/* <Column field="Nombre"          header="Nombre"></Column> */}
              <Column field="Fecha_creacion"  header="Fecha_Creacion"></Column>
          </DataTable>
    </div>
  )
}
