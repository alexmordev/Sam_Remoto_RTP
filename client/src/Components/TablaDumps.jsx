import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { elementos } from "../Pruebas/DumpsExample";

export const TablaDumps = () => {
  const [products, setProducts] = useState([]); //Aqui se almacenará el arreglo de la SAM

  //Solo una vez se carga el state de los datos de la sam, aqui sera la peticion de la API
  // para traer la información
  useEffect(() => {
    setProducts(elementos);
  }, []);

  return (
    <div>
      <div className="card">
        <DataTable
          value={products}
          paginator
          responsiveLayout="scroll"
          breakpoint="960px"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks 
                    NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[8,10,12]}
        >
          <Column field="id" header="id"></Column>
          <Column field="nstarjeta" header="N.S. Tarjeta"></Column>
          <Column field="environment" header="Enviroment Log"></Column>
          <Column field="events" header="Events Log"></Column>
        </DataTable>
      </div>
    </div>
  );
};
