import React from "react";
import { Header } from "../../Components/Header/Header";
import { TablaSam } from './../../Components/TablaSam';

export const SamCounter = () => {
 

  return (
    <div className=" h-full w-full">
      <Header />
      <br />
      <div className="  flex flex-column justify-content-center align-content-center" >

        <div className=" w-full h-4rem bg-green-400 flex justify-content-center align-content-center 
                flex-wrap card-container">
            <p className="text-3xl font-bold text-white  flex align-content-center 
                          justify-content-center">
              Tabla General
            </p>
          </div>
          <br /><br />
          <div className="flex justify-content-center align-content-center ">
              <TablaSam  />
        </div>

      </div>
      
    
    </div>
  );
};
/* 
w-auto h-4rem bg-green-400 flex-wrap card-container 
                        flex justify-content-center align-content-center flex-wrap */