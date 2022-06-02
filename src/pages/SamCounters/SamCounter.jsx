import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const SamCounter = () => {

//   return (
//     <div>
//       <div className="card">
//         <DataTable value={'products'} responsiveLayout="scroll">
//             <Column field="Id" header="Id"></Column>
//             <Column field="Sam" header="SAM"></Column>
//             <Column field="Tarjeta" header="Tarjeta"></Column>
//             <Column field="C00" header="C.00"></Column>
//             <Column field="C01" header="C.01"></Column>
//             <Column field="C02" header="C.02"></Column>
//             <Column field="C03" header="C.03"></Column>
//             <Column field="C04" header="C.04"></Column>
//             <Column field="C05" header="C.05"></Column>
//             <Column field="C06" header="C.06"></Column>
//             <Column field="C07" header="C.07"></Column>
//             <Column field="C08" header="C.08"></Column>
//             <Column field="C09" header="C.09"></Column>
//             <Column field="C10" header="C.10"></Column>
//             <Column field="C11" header="C.11"></Column>
//         </DataTable>
//       </div>
//     </div>
//   )


  const elementos = [
    {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
    {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
    {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
    {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
    {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
    {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
    {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
    {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
    {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
    {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
  ]

  const [products, setProducts] = useState([]);

  useEffect(() => {
        setProducts(elementos);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(products);

  return (
    <div>
        <div className="card">
            <DataTable value={products} responsiveLayout="scroll">
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>
    </div>
);





}
 
 
 
