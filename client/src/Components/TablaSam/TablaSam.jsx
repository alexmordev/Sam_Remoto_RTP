import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { getSamCounters } from "./../../helpers/getSamCounters";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { elementos } from "../../prueba/CounterSamExample";

export const TablaSam = () => {
  const [products, setProducts] = useState([]); //Aqui se almacenará el arreglo de la SAMs
  const [filters1, setFilters1] = useState();
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");

  useEffect(() => {
    getData();
    // setProducts(elementos)
  }, []);


  const getData = async () => {
    const { categories } = await getSamCounters();
    console.log(categories);
    for (let index = 0; index < categories.length; index++) {
      
      let secuencia = (categories[index].secuencia)? categories[index].secuencia : 'Sin secuencia' 
      let nuevoNombre = (categories[index].user)? categories[index].user.name : 'Sin nombre'
      let fecha = categories[index].createdAt.substring(0, 10);
      let hora = categories[index].createdAt.substring(11, 19);
      let fechaHora = `${fecha} ${hora}`;
      let element = {
        id: categories[index].id,
        sam: categories[index].sam,
        tarjeta: categories[index].tarjeta,
        c00: categories[index].c00,
        c01: categories[index].c01,
        c02: categories[index].c02,
        c03: categories[index].c03,
        c04: categories[index].c04,
        c05: categories[index].c05,
        c06: categories[index].c06,
        c07: categories[index].c07,
        c08: categories[index].c08,
        c09: categories[index].c09,
        c10: categories[index].c10,
        c11: categories[index].c11,
        c12: categories[index].c12,
        c13: categories[index].c13,
        c14: categories[index].c14,
        c15: categories[index].c15,
        c16: categories[index].c16,
        c17: categories[index].c17,
        c18: categories[index].c18,
        c19: categories[index].c19,
        c20: categories[index].c20,
        c21: categories[index].c21,
        c22: categories[index].c22,
        c23: categories[index].c23,
        c24: categories[index].c24,
        c25: categories[index].c25,
        c26: categories[index].c26,
        user:     nuevoNombre,
        secuencia: secuencia,
        fecha_creacion: fechaHora,
      };
      setProducts((pro) => [...pro, element]);
    }
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(products);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    // let _filters1 = { ...filters1 };
    // _filters1['global'].value = value;

    // setFilters1(_filters1);
    // setGlobalFilterValue1(value);
  }

  const clearFilter1 = () => {
    initFilters1();
  };

  const initFilters1 = () => {
    setFilters1({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'sam': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
      'tarjeta': {operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }]},
      'secuencia': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'user': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'fecha_creacion': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    });
    setGlobalFilterValue1('');
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        {/* <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Buscar"
          />
        </span> */}
      </div>
    );
  };

  const header1 = renderHeader1();

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
      <DataTable
        dataKey="id_table"
        value={products}
        paginator
        responsiveLayout="scroll"
        breakpoint="960px"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks 
            NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        rowsPerPageOptions={[8, 10, 12]}
        className="w-auto"
        size="large"
        filters = {filters1}  
        filterDisplay = "menu" 
        globalfilterfields = {[ 'id', 'sam','tarjeta', 'secuencia', 'user', 'fecha_creacion' ]}
        header = {header1}  
        emptyMessage = "No hay resultados"
      >
        <Column field="id"  header="id" filter filterField="id" sortable></Column>
        <Column field="sam" header="SAM" filter filterField="sam" sortable></Column>
        <Column field="tarjeta" header="Tarjeta" filter filterField="tarjeta" sortable></Column>
        <Column field="c00" header="C00" filter sortable></Column>
        <Column field="c01" header="C01" filter sortable></Column>
        <Column field="c02" header="C02" filter sortable></Column>
        <Column field="c03" header="C03" filter sortable></Column>
        <Column field="c04" header="C04" filter sortable></Column>
        <Column field="c05" header="C05" filter sortable></Column>
        <Column field="c06" header="C06" filter sortable></Column>
        <Column field="c07" header="C07" filter sortable></Column>
        <Column field="c08" header="C08" filter sortable></Column>
        <Column field="c09" header="C09" filter sortable></Column>
        <Column field="c10" header="C10" filter sortable></Column>
        <Column field="c11" header="C11" filter sortable></Column>
        <Column field="c12" header="C12" filter sortable></Column>
        <Column field="c13" header="C13" filter sortable></Column>
        <Column field="c14" header="C14" filter sortable></Column>
        <Column field="c15" header="C15" filter sortable></Column>
        <Column field="c16" header="C16" filter sortable></Column>
        <Column field="c17" header="C17" filter sortable></Column>
        <Column field="c18" header="C18" filter sortable></Column>
        <Column field="c19" header="C19" filter sortable></Column>
        <Column field="c20" header="C20" filter sortable></Column>
        <Column field="c21" header="C21" filter sortable></Column>
        <Column field="c22" header="C22" filter sortable></Column>
        <Column field="c23" header="C23" filter sortable></Column>
        <Column field="c24" header="C24" filter sortable></Column>
        <Column field="c25" header="C25" filter sortable></Column>
        <Column field="c26" header="C26" filter sortable></Column>
        <Column field="secuencia" header="Secuencia" filter filterField="secuencia" sortable></Column>
        <Column field="user" header="Nombre" filter filterField="user" sortable></Column>
        <Column field="fecha_creacion"  header="Fecha_Creacion" filter filterField="fecha_creacion" sortable></Column>
      </DataTable>
    </div>
  );
};

