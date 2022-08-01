import React from "react";
import { Container } from "../../Components/Container/Container";
// import { Header } from "../../Components/Header/Header";
import { TablaSam } from './../../Components/TablaSam';
import { Card } from 'primereact/card';

export const SamCounter = () => {
 

  return (


<Container>
  <Card title="Contadores del SAM">
    <TablaSam/>
  </Card>
  {/* <div className="mb-8">
    <div className="flex  justify-content-center  ">
      
    </div>
    <div className="mb-8">
      <TablaSam/>
    </div>
  </div> */}
</Container>
);
};