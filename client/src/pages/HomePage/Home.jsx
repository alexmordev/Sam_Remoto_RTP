import React from "react";
import { Container, GraficaPastel, UserCard } from "../../Components";
import { AuthProvider } from "../../auth/context/AuthProvider";

export const Home = () => {
  return (
    <AuthProvider>
    <Container>
      <div className="h-full w-full bg-blue-900 card-container flex">
        <div className="border-2 border-white w-5 flex 
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
        <div className=" w-7 flex flex-column  ">
          {/* <div className="border-2 border-white bg-red-300 w-full h-30rem"> */}
          <div className="border-2 border-white w-full h-30rem">
            <div className="p-5">
            <GraficaPastel className="p-3" />
            </div>
          </div>
          <div className="w-full h-30rem flex">
            {/* <div className="border-2 border-white bg-pink-300 h-full w-6 "> */}
            <div className="border-2 border-white h-full w-6 ">
              <i className="pi pi-info-circle text-white text-7xl p-4">
                <span className="text-5xl"> Informacion</span></i> 
                
            
            </div>
            {/* <div className="border-2 border-white bg-yellow-300 h-full w-6"> */}
            <div className="border-2 border-white h-full w-6">
            
              {/* <i className="pi pi-lock text-white text-7xl" /> */}
              <i className="pi pi-shield text-white text-7xl p-4">
                <span className="text-5xl"> Seguridad</span></i> 
                <p></p>

            </div>
          </div>
        </div>
      </div>
    </Container>
    </AuthProvider>
  );
};
