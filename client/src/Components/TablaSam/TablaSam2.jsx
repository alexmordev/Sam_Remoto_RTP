import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { getSamCounters } from "../../helpers/getSamCounters";
const TablaSam2 = () => {
  const [products, setProducts] = useState([]); //Aqui se almacenará el arreglo de la SAM

  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);
  const [first2, setFirst2] = useState(0);
  const [rows2, setRows2] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  const onCustomPage1 = (event) => {
    setFirst1(event.first);
    setRows1(event.rows);
    setCurrentPage(event.page + 1);
  };

  const onCustomPage2 = (event) => {
    setFirst2(event.first);
    setRows2(event.rows);
  };

  const onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setFirst1(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const datos = await getSamCounters();
    setProducts(datos.categories);
  };

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const template1 = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "All", value: options.totalRecords },
      ];

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="mx-3"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Go to{" "}
          <InputText
            size="2"
            className="ml-1"
            value={currentPage}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
        </span>
      );
    },
  };

  return (
    <div className="card">
      <DataTable
        value={products}
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        rowsPerPageOptions={[8, 10, 12]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column field="id" style={{ with: "25%" }} header="id"></Column>
        <Column field="sam" style={{ with: "25%" }} header="SAM"></Column>
        <Column
          field="tarjeta"
          style={{ with: "25%" }}
          header="Tarjeta"
        ></Column>
        <Column field="c00" style={{ with: "25%" }} header="C00"></Column>
        <Column field="c01" style={{ with: "25%" }} header="C01"></Column>
        <Column field="c02" style={{ with: "25%" }} header="C02"></Column>
        <Column field="c03" header="C03"></Column>
        <Column field="c04" header="C04"></Column>
        <Column field="c05" header="C05"></Column>
        <Column field="c06" header="C06"></Column>
        <Column field="c07" header="C07"></Column>
        <Column field="c08" header="C08"></Column>
        <Column field="c09" header="C09"></Column>
        <Column field="c10" header="C10"></Column>
        <Column field="c11" header="C11"></Column>
        <Column field="c12" header="C12"></Column>
        <Column field="c13" header="C13"></Column>
        <Column field="c14" header="C14"></Column>
        <Column field="c15" header="C15"></Column>
        <Column field="c16" header="C16"></Column>
        <Column field="c17" header="C17"></Column>
        <Column field="c18" header="C18"></Column>
        <Column field="c19" header="C19"></Column>
        <Column field="c20" header="C20"></Column>
        <Column field="c21" header="C21"></Column>
        <Column field="c22" header="C22"></Column>
        <Column field="c23" header="C23"></Column>
        <Column field="c24" header="C24"></Column>
        <Column field="c25" header="C25"></Column>
        <Column field="c26" header="C26"></Column>
      </DataTable>
    </div>
  );
};

export default TablaSam2;
