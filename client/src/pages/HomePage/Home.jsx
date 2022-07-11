import React from "react";
import { Container, GraficaPastel, UserCard } from "../../Components";
// import { getUser } from "../../helpers/getUser";

export const Home = () => {
  return (
    <Container>
      <div className="h-full w-full card-container flex">
      <div className="bg-blue-300 h-screen w-5">
        <p className="
          text-6xl 
          font-bold
          text-white

        ">
          BIENVENIDO
        </p>
        <UserCard />

        
      </div>
      <div className="bg-pink-300 w-7 flex flex-column  ">
        <div className="bg-red-300 w-full h-30rem">
        </div>
        <div className="bg-yellow-300 w-full h-30rem flex">
          <div className="bg-pink-300 h-full w-6 ">
            
          </div>
          <div className="bg-yellow-300 h-full w-6">

          </div>
        </div>
      </div>


      {/* <div className="h-screen w-full flex flex-column ">

        <div className="bg-purple-200 w-screen h-28rem">
          <UserCard />
        </div>

        <div className="bg-blue-300 w-screen h-28rem flex">
          <div className="bg-yellow-400 h-28rem w-4">
            
          </div>
          <div className="bg-teal-400 h-28rem w-4">
            
          </div>
          <div className="bg-blue-400 h-28rem w-4">
            
          </div>
        </div> */}

        {/* <div className="
          w-4 bg-red-300 flex 
          justify-content-center flex-wrap
        " >
          <p className="
              w-7 text-5xl text-gray-50 
              text-center
            ">
            Bienvenido
          </p>
          <UserCard />
        </div>

        <div className="
          w-4 bg-yellow-300
        ">

          <div className="
            bg-red-300 w-6 flex
            justify-content-center flex-wrap
          ">
            <p className="text-4xl">Importante</p>
            <p >
              Recuerda que tienes un tiempo limite de 30 minutos para el uso de 
              esta aplicación, al finalizar el tiempo se cerrará sesión
              automaticamente 
            </p>            
          </div>

          <div className="
            bg-blue-300 w-6 flex
            justify-content-center flex-wrap
          ">
            <p className="text-4xl">Seguridad</p>            
            <p >
              El uso de este software esta restringido a su uso, cualquier mal 
              manejo que se logre detectar
            </p>  
          </div>

        </div>


        <div className="
            w-4 h-30rem flex 
            justify-content-center flex-wrap
            absolute top-10 right-0
        ">
          <p className="
            border-2 border-gray-50 w-7 
            text-3xl text-gray-50 text-center
          ">
            Uso del software
          </p>
          <GraficaPastel />
        </div> */}
      </div>
    </Container>
  );
};
