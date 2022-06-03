import React from 'react'
import {TablaDumps} from '../../Components/TablaDumps';
export const Dumps = () => {

  return (
    <div>
      <div className=" w-full h-4rem bg-green-400 flex-wrap card-container">
        <p className="text-3xl font-bold text-white  flex align-content-center 
                      justify-content-center">
          Tabla General de Lectura de Tarjetas
        </p>
      </div>

      <br /><br />
      <div className=" flex justify-content-center ">
          <TablaDumps/>
      </div>

    </div>
  )
}
