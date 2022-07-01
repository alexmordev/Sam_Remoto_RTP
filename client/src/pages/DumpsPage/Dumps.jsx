import React from "react";
import { Container } from "../../Components/Container/Container";
import { TablaDumps } from "../../Components/TablaDumps";
export const Dumps = () => {
  return (
    <Container>
      <div className="w-full h-screen flex flex-column  align-items-center">
        <div
          className="m-4 w-full h-4rem bg-green-400 flex justify-content-center 
          align-content-center flex-wrap card-container"
          >
          <p
            className="text-3xl font-bold text-white  flex align-content-center 
            justify-content-center"
            >
            Tabla General de Lectura de Tarjetas
          </p>
        </div>
        <div className=" ">
          <TablaDumps />
        </div>
      </div>
    </Container>

  );
};