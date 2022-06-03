import React from "react";
import { TablaSam } from "../../Components/TablaSam";

export const SamCounter = () => {
 

  return (
    <div>

      <div className=" w-full h-4rem bg-green-400 flex-wrap card-container">
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
  );
};
