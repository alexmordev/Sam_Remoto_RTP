import React from "react";
import { Container } from "../../Components/Container/Container";
import { Header } from "../../Components/Header/Header";
import { TablaDumps } from "../../Components/TablaDumps";
export const Dumps = () => {
  return (
//     <div className=" h-full w-full">
//       <Header />
//       <br />
//       <div className="  flex flex-column justify-content-center align-content-center">
//         <div
//           className=" w-full h-4rem bg-green-400 flex justify-content-center 
//                         align-content-center flex-wrap card-container"
//         >
//           <p
//             className="text-3xl font-bold text-white  flex align-content-center 
//                         justify-content-center"
//           >
//             Tabla General de Lectura de Tarjetas
//           </p>
//         </div>

//         <br />
//         <br />
//         <div className=" flex justify-content-center ">
//           <TablaDumps />
//         </div>
//       </div>
//     </div>
//   );
// };


  <Container>
  <div
    className=" w-full h-4rem bg-green-400 flex justify-content-center 
    align-content-center flex-wrap card-container"
    >
    <p
      className="text-3xl font-bold text-white  flex align-content-center 
      justify-content-center"
      >
      Tabla General de Lectura de Tarjetas
    </p>
  </div>
  <TablaDumps />
</Container>

);
  };