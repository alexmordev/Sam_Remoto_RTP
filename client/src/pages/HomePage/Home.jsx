import React from "react";
import { Container, GraficaPastel, UserCard } from "../../Components";

export const Home = () => {
  return (
    <Container>
      <div className="h-full w-full bg-blue-900 card-container flex flex-wrap"> 
        <div className="border-2 border-white w-auto flex-auto
          flex-column align-items-center ">
          <p className="
            text-6xl 
            font-bold
            text-white

          ">
            BIENVENIDO
          </p>
          <UserCard />

          
        </div>
        <div className="w-9 flex flex-column md: flex-grow-1">
          {/* <div className="border-2 border-white bg-red-300 w-full h-30rem"> */}
          <div className="border-2 border-white w-auto flex-auto">
            <div className="p-5 flex justify-content-center align-items-center">
            <GraficaPastel className="p-3" />
            </div>
          </div>
          <div className="w-full h-30rem flex">
            {/* <div className="border-2 border-white bg-pink-300 h-full w-6 "> */}
            <div className="border-2 border-white h-auto w-7">
              
              <i className="pi pi-info-circle text-white text-5xl p-4 flex flex-wrap">
                <span className="text-5xl"> Información</span></i> 
                
            
            </div>
            {/* <div className="border-2 border-white bg-yellow-300 h-full w-6"> */}
            <div className="border-2 border-white h-auto w-7" >
            
              {/* <i className="pi pi-lock text-white text-7xl" /> */}
              <i className="pi pi-shield text-white text-5xl p-4 flex flex-wrap">
                <span className="text-5xl"> Seguridad</span></i> 
                <p></p> 

            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
