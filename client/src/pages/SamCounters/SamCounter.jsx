import React from "react";
import { Container } from "../../Components/Container/Container";
import { TablaSam } from './../../Components/TablaSam';

export const SamCounter = () => {
 
  

  return (

<Container>
  <div className="w-full h-screen">
    <div className="mt-4 mb-5 bg-green-300 w-full h-4rem flex justify-content-center align-items-center">
      <p className="text-white-alpha-90 font-bold text-3xl">Tabla General</p>
    </div>
    <div className="flex  justify-content-center ">
      <TablaSam  />
    </div>
  </div>
</Container>
);
};